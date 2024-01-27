import * as yup from 'yup';
import { toast } from 'react-toastify';

const loginSchema = yup.object().shape({
  email: yup.string().email('Informe um e-mail válido').required('O e-mail é obrigatório'),
  password: yup.string().required('A senha é obrigatória'),
});

export default function loginValidation(data) {
  try {
    loginSchema.validateSync(data, { abortEarly: false });
    return true
  } catch (error) {

    error.inner.forEach((validationError) => {
      toast.error(validationError.message);
    });
    return false
  }
}
