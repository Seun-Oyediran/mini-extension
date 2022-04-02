import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './App.css';
import { ClassCard, RenderIf } from './components';
import { loginStudent, logoutStudent } from './redux/actions/authAction';
import { RootStateType } from './redux/reducers';

interface IClassItem {
  id: string;
  class: string;
  students: Array<string>;
}

function App() {
  const dispatch = useDispatch();
  const {
    loginError, loginLoading, loginSuccess, loggedIn, classesData, error,
  } = useSelector(
    (state: RootStateType) => state,
  ).auth;
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!inputRef.current?.value) {
      toast.error('Please enter a name');
      return;
    }
    dispatch(loginStudent(inputRef.current?.value));
  };

  const handleLogout = () => {
    dispatch(logoutStudent());
  };

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Login sucessful');
    }

    if (loginError) {
      toast.error(error || 'Something went wrong');
    }
  }, [loginError, loginSuccess]);

  return (
    <div className="container">
      <div className="flex-con">
        <RenderIf condition={!loggedIn && !loginLoading}>
          <div className="login-form">
            <form onSubmit={onSubmit}>
              <input ref={inputRef} type="text" name="name" />
              <div>
                <button type="submit">Login</button>
              </div>
            </form>
          </div>
        </RenderIf>

        <RenderIf condition={loginLoading}>
          <div className="loader">
            <h2>Loading...</h2>
          </div>
        </RenderIf>

        <RenderIf condition={loggedIn && !loginLoading}>
          <div className="logout-button">
            <button onClick={handleLogout} type="button">
              Logout
            </button>
          </div>

          <div className="class-card-container">
            {classesData.map((item: IClassItem) => (
              <ClassCard key={item.id} name={item.class} students={item.students} />
            ))}
          </div>
        </RenderIf>
      </div>
    </div>
  );
}

export default App;
