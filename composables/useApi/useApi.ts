// composables/useApi.ts

import type { HttpMethod, UseApiOptions, UseApiResponse } from "./types";

export const useApi = async <T>(endpoint: string, options: UseApiOptions = {}): Promise<UseApiResponse<T>> => {
  const { method = 'GET', body, headers } = options;

  // Получение базового URL из переменной окружения
  const baseUrl = import.meta.env.VITE_BASE_URI; // Используйте import.meta.env для доступа к переменным окружения
  const url = `${baseUrl}${endpoint}`; // Формирование полного URL

  // Установка заголовков по умолчанию
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'X-Platform': 'EXO',
    'X-Client': 'EXO',
    ...headers, // Объединение с пользовательскими заголовками
  };

  // Выполнение запроса
  const { data, error } = await useFetch<T>(url, {
    method: options.method?.toLowerCase() || 'get' as HttpMethod, // Приведение метода к нижнему регистру
    body,
    headers: defaultHeaders,
  });

  return { data, error };
};