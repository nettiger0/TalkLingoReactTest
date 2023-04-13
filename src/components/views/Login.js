import React, {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import axios from "axios";

const Login = () => {
	const [id, setId] = useState("");
	const [password, setPassword] = useState("");
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const history = useNavigate();

	// axios 임시
	/* const onSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/login', {
              id,
              password,
            });
      
            if (response.data.success) {
              sessionStorage.setItem('user', JSON.stringify(response.data.user));
              history.push('/');
            } else {
              alert('Invalid credentials');
            }
          } catch (error) {
            console.error('Login error:', error);
            alert("로그인 에러!");
          }
    }; */


    // sessionStorage에 저장된 내용을 storedUser에 저장
	const storedUser = sessionStorage.getItem("user");
	let storedName = "";

	if (storedUser) {
		const {name} = JSON.parse(storedUser);
		storedName = name;
	}

	const onSubmit = (e) => {
		e.preventDefault();

		if (storedUser) {
			const {id: storedId, password: storedPassword} = JSON.parse(storedUser);
			if (id === storedId && password === storedPassword) {
				setIsLoggedIn(true);
				history("/");
			}else {
                alert('ID 혹은 비밀번호가 틀립니다.')
            }
		} else {
            alert('해당 사용자가 존재하지 않습니다.')
        }
	};

    //로그아웃시 sessionStorage에 저장된 내용 삭제
    const handleLogout = () => {
        sessionStorage.removeItem('user');
        setIsLoggedIn(false);
        history('/');
        setId('');
        setPassword('');
    }

	const onChangeId = (e) => {
		setId(e.target.value);
	};

	const onChangePassword = (e) => {
		setPassword(e.target.value);
	};

	return (
		<div>
			{isLoggedIn ? (
				<div>
                    <div> Hello, {storedName}</div>
                    <button type="button" onClick={handleLogout}>로그아웃</button>
                    <Link to='/Update'>
                        <button type="button">정보수정</button>
                    </Link>
                </div>
			) : (
				<div>
					<form onSubmit={onSubmit}>
						<label htmlFor="id">ID : </label>
						<input
							type="text"
							name="id"
							value={id}
							onChange={onChangeId}
							required></input>{" "}
						<br />
						<label htmlFor="password">P/W : </label>
						<input
							type="password"
							name="password"
							value={password}
							onChange={onChangePassword}
							required></input>
						<div style={{marginTop: 10}}>
							<button type="primary" htmltype="submit">
								로그인
							</button>
						</div>
					</form>
					<div>
						<Link to="/SignUp">
							<button>회원가입</button>
						</Link>
					</div>
				</div>
			)}
		</div>
	);
};

export default Login;
