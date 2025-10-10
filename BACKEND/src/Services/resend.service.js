import {Resend } from 'resend'
import { ENV } from './env.service.js';



export const resendClient= new Resend(ENV.RESEND_API_KEY);

export const sender={
    email: process.env.EMAIL_FROM.trim(),
    name:process.env.EMAIL_FROM_NAME.trim(),
}