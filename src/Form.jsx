import React from 'react'
import {useForm} from 'react-hook-form'
import {DevTool} from '@hookform/devtools'

export const Form = () => {

    const form = useForm({
        defaultValues: async () => {
            const res = await fetch('https://jsonplaceholder.typicode.com/users/1')
            const data = await res.json()
            return {
                username : data.username,
                email: data.email,
                channel: ""
            }
        }
    })
    const {register, control, handleSubmit, formState} = form;
    const {errors} = formState 
    console.log('formState', formState);
    const onSubmit = (data) => {
        console.log('form submitted', data);
    }


  return (
    <>
    <form onSubmit={handleSubmit(onSubmit)} className='formContainer' noValidate>
        <label htmlFor="username">Username</label>
        <input type="text" id='username' {...register('username', {required: 'username is required'})}/>
        <p className='error'>{errors.username?.message}</p>
        <label htmlFor="email">E-mail</label>
        <input type="text" id='email' {...register('email', {
            pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message:'invalid email format'
            },
            // validate: (fieldValue) => {
            //     return(
            //         fieldValue !== 'admin@gmail.com' || 'enter a new email adress   '
            //     )
            // }

            validate : {
                notAdmin: (fieldValue) => {
                    return (
                        fieldValue !== 'admin@gmail.com' || 'enter a new email adress   '
                    )   
                }, 
                Inavlid: (fieldValue) => {
                    return (
                        fieldValue !== 'xnxx.com' || 'illigial'
                    )
                }
            } 
        })}/>
        <p className='error'>{errors.email?.message}</p>
        <label htmlFor="channel">Channel</label>
        <input type="text" id='channel' {...register('channel', {required: 'channel name is required'})}/>
        <p className='error'>{errors.channel?.message}</p>
        <button>Submit</button>
        
    </form>
    <DevTool control={control}/>
    </>
  )
}
