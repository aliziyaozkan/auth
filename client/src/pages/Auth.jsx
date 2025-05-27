import React, { useState } from "react";
import "../css/auth.css";
import "../App.css";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [flipped, setFlipped] = useState(false);
  const toggleFlip = () => setFlipped((prev) => !prev);

  const navigate = useNavigate();
  // Form state'leri
  const [signUpData, setSignUpData] = useState({
    username: "",
    email: "",
    password: "",
    repassword: "",
  });

  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const handleSignUpChange = (e) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleSignInChange = (e) => {
    setSignInData({ ...signInData, [e.target.name]: e.target.value });
  };

  const handleSignUpSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signUpData),
      });
      const data = await res.json();
      if (res.ok) {
        alert("Kayıt başarılı!");
        toggleFlip();
      } else {
        alert(data.message || "Kayıt başarısız");
      }
    } catch (error) {
      alert("Sunucu hatası");
    }
  };

  const handleSignInSubmit = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signInData),
      });
      const data = await res.json();
      if (res.ok) {
        navigate("/home");
        // Token'ı localStorage'a kaydedebilirsin
        localStorage.setItem("token", data.token);
        localStorage.setItem("signedUpUser", JSON.stringify(data.username));
      } else {
        alert(data.message || "Giriş başarısız");
      }
    } catch (error) {
      alert("Sunucu hatası");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen outfit">
      <div className="card-container ">
        <div className={`card${flipped ? " flipped" : ""}`} id="authCard">
          {/* Front - Sign In */}
          <div className="card-face card-front flex align-middle justify-center">
            <div className="gradient-border">
              <div className="card-content">
                <div className="flex flex-row mb-11">
                  <img src="/src/images/b.png" alt="b" className="w-14" />
                  <img src="/src/images/l.png" alt="l" className="w-14" />
                  <img src="/src/images/o.png" alt="o" className="w-14" />
                  <img src="/src/images/g.png" alt="g" className="w-14" />
                </div>
                
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={signInData.email}
                  onChange={handleSignInChange}
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  name="password"
                  required
                  value={signInData.password}
                  onChange={handleSignInChange}
                />
                <button onClick={handleSignInSubmit}>Giriş Yap</button>
                <p className="text-white mt-3">
                  Hesabın yok mu?{" "}
                  <span className="toggle-btn" onClick={toggleFlip}>
                    Kayıt ol
                  </span>
                </p>
              </div>
            </div>
          </div>

          {/* Back - Sign Up */}
          <div className="card-face card-back">
            <div className="gradient-border">
              <div className="card-content">
                <h2 className="text-white">Kayıt ol</h2>
                <input
                  type="text"
                  placeholder="Kullanıcı Adı"
                  name="username"
                  required
                  value={signUpData.username}
                  onChange={handleSignUpChange}
                />
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  required
                  value={signUpData.email}
                  onChange={handleSignUpChange}
                />
                <input
                  type="password"
                  placeholder="Şifre"
                  name="password"
                  required
                  value={signUpData.password}
                  onChange={handleSignUpChange}
                />
                <input
                  type="password"
                  name="repassword"
                  placeholder="Şifre Tekrar"
                  required
                  value={signUpData.repassword}
                  onChange={handleSignUpChange}
                />
                <button onClick={handleSignUpSubmit}>Kayıt ol </button>
                <p className="text-white mt-3">
                 Zaten hesabın var mı?{" "}
                  <span className="toggle-btn" onClick={toggleFlip}>
                    Giriş Yap
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
