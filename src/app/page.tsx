'use client';

import { useForm } from 'react-hook-form';

export default function Home() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      user_type: 'PLATFORMUSER',
    },
  });
  return (
    <div
      style={{
        height: '50vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '10px',
      }}
    ></div>
  );
}
