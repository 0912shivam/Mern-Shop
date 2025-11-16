import axios from 'axios'

export const axiosi=axios.create({withCredentials:true,baseURL:import.meta.env.VITE_APP_BASE_URL || 'http://localhost:8000'})