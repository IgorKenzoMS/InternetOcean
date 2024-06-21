// LogoutModal.tsx
import React, { useEffect, useState, useRef } from "react";
import styles from "../styles/LogoutModal.module.css";
import perfil from "../img/FotoUsuarioPerfil.png";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
    onLogout: () => void;
    onCancel: () => void;
}

interface UserInfo {
    nome: string;
    email: string;
}

function LogoutModal({ onLogout, onCancel }: LogoutModalProps) {
    const navigate = useNavigate();
    const modalRef = useRef<HTMLDivElement>(null); // Adiciona o tipo explícito para o useRef
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const token = localStorage.getItem("token");

            if (token) {
                try {
                    const response = await fetch("http://localhost:5000/user-info", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                        body: JSON.stringify({ token }),
                    });

                    if (response.ok) {
                        const data = await response.json();
                        setUserInfo(data);
                    } else {
                        console.error("Erro ao obter informações do usuário");
                    }
                } catch (error) {
                    console.error("Erro ao buscar informações do usuário:", error);
                }
            }
        };

        fetchUserInfo();
    }, []);

    const handleBackgroundClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
            onCancel();
        }
    };

    const handleManageAccountClick = () => {
        onCancel(); // Fecha o modal antes de navegar para /perfil
        navigate("/perfil");
    };

    return (
        <div className={styles.modalBackground} onClick={handleBackgroundClick}>
            <div ref={modalRef} className={styles.logoutModalContainer}>
                <p className={styles.conta}>Conta</p>
                <div className={styles.informacoesPessoaisContainer}>
                    <img src={perfil} alt="" />
                    <div className={styles.informacoesPessoais}>
                        <p className={styles.nome}>{userInfo ? userInfo.nome : "Carregando..."}</p>
                        <p className={styles.email}>{userInfo ? userInfo.email : ""}</p>
                    </div>
                </div>
                <p onClick={handleManageAccountClick} className={styles.logout}>Gerenciar Conta</p>
                <hr />
                <p onClick={onLogout} className={styles.logout}>Fazer Logout</p>
            </div>
        </div>
    );
}

export default LogoutModal;
