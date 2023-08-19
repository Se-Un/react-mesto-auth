// импорты
import React from 'react';

function Login(props) {
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
    props.onSignIn(formValue.email, formValue.password)
  }
  // useEffect для отображенния идентификации компонента
  React.useEffect(() => {
    props.setLoginForm(true);
  }, [props]);

  return (
    <div className="auth">
      
      <h2 className="auth__title">Вход</h2>

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

        <button className="auth__submit">Войти</button>

      </form>
      </div>
  )
}

export default Login;