
import { AuthLayout } from '../layout/AuthLayout'

export const RegisterPage = () => {
  return (
    <AuthLayout title='register'>
    <form>
      <label htmlFor="">email</label>
      <input type="text" placeholder='email' name="" id="" />
      <label htmlFor="">password</label>
      <input type="password" placeholder='password' name="" id="" />
      <label htmlFor="">confirm password</label>
      <input type="text" placeholder='confirm password' name="" id="" />
      <button>register</button>
    </form>
  </AuthLayout>
  )
}
