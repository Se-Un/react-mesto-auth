// импорты
import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {
   // переменная состояная для хранения данных из инпутов
   const [ formValue, setFormValue ] = React.useState({
    email: "",
    password: "",
  });
  // функция обработчик сохранения значений инпутов
  function handleChange(evt) {
    const { name, value } = evt.target;

    setFormValue({...formValue, [name]: value});
  };
  // функция обработчик отправки данных формы
  function handleSubmit(evt) {
    evt.preventDefault();
    props.onSignUp(formValue.email, formValue.password)
  }
  // useEffect для отображенния идентификации компонента
  React.useEffect(() => {
    props.setLoginForm(false);
  }, [props]);
  
  return (
    <div className="auth">
      
      <h2 className="auth__title">Регистрация</h2>

      <form className="auth__form" onSubmit={handleSubmit}>

        <input className="auth__input" 
        name="email" 
        type="email" 
        placeholder="Email"
        required
        value={formValue.email}
        onChange={handleChange} 
        />
        <input className="auth__input" 
        name="password" 
        type="password" 
        placeholder="Пароль"
        required
        value={formValue.password}
        onChange={handleChange} 
        />

        <button className="auth__submit">Зарегистрироваться</button>
        <Link className="auth__link" to="/sign-in">Уже зарегистрированы? Войти</Link>

      </form>
     
    </div>
  )
}
export default Register;