import React, { useEffect } from "react";
import "./App.scss";
import Chat from "./components/chat/Chat";
import Sidebar from "./components/sidebar/Sidebar";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { auth } from "./firebase";
import { login, logout } from "./features/userSlice";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorFallBack } from "./utils/ErrorFallBack";

// ユーザー状態を取得する必要がある。（ログインしていない場合、ログイン画面表示。ログインしている場合、sidebar,chatページの表示）reduxでユーザ情報取得。
function App() {
  //ユーザ情報を取得するための、記述。
  const user = useAppSelector((state) => state.user.user);
  console.log(user);
  // const user = null;

  const dispatch = useAppDispatch();

  // 発火のタイミングを決めることができるhooks(useEffect)
  //onSuthStateChangedは認証状態が変わったら(ユーザーがログインしたら)その情報をとってくることができる。
  //通知を出すために発火させる必要がある。そのため、第二引数である[]の中にdispatchと入力する。
  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      console.log(loginUser);
      if (loginUser) {
        dispatch(
          login({
            uid: loginUser.uid,
            photo: loginUser.photoURL,
            email: loginUser.email,
            displayName: loginUser.displayName,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <Sidebar />
            <Chat />
          </ErrorBoundary>
        </>
      ) : (
        <>
          <Login />
        </>
      )}
    </div>
  );
}

export default App;
