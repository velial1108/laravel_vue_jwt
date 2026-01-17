import axios from "axios";
import router from "@/router.js";
//start requst
const api = axios.create();
api.interceptors.request.use(
    config => {
        if(localStorage.getItem('access_token')){
            config.headers.Authorization = `Bearer ${localStorage.getItem('access_token')}`

        }
        return config
    },
    //ошибка возникает только при проблемах при получении запроса с фронтас клиентской частью
    error => {}
)
//end request
//start response
// ✅ Response interceptor — обрабатываем 401 и делаем refresh
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        // Безопасная проверка
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // защита от бесконечного цикла

            const token = localStorage.getItem("access_token");
            if (!token) {
                router.push("/login");
                return Promise.reject(error);
            }

            try {
                // Отправляем СТАРЫЙ токен на /refresh
                const res = await axios.post(
                    "/api/auth/refresh",
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`, // ← правильное имя заголовка
                        },
                    }
                );

                const newAccessToken = res.data.access_token;
                localStorage.setItem("access_token", newAccessToken);

                // Обновляем заголовок в оригинальном запросе
                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

                // Повторяем провалившийся запрос
                return api(originalRequest);
            } catch (refreshError) {
                console.error("Refresh failed:", refreshError.response?.data || refreshError.message);
                localStorage.removeItem("access_token");
                router.push("/login");
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);
export default api
