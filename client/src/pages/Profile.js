import React, { useState, useEffect } from 'react';

function Profile(){
    const [user, setUser] = useState({ name: '', score: 0, referralLink: '' });
    const [error, setError] = useState('');
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token){
            setError('Você precisa estar logado para ver seu perfil.');
            return;
        }

        fetch('http://localhost:3000/profile', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error){
                setError(data.error);
            } else {
                setUser({ name: data.name, score: data.score, referralLink: data.referralLink });
            }
        })
        .catch(() => setError('Erro ao carregar perfil.'));
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(user.referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000)
    };

    if (error){
        <p style={{ color: 'red'}}>{error}</p>;
    }

    return (
        <div>
            <h2>Perfil</h2>
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Pontuação:</strong> {user.score}</p>
            <p>
                <strong>Link de indicação:</strong> <br/>
                <input type="text" value={user.referralLink} readOnly style={{ width: '80%'}}/>
                <button onClick={handleCopy} style={{ marginLeft: '10px' }}>
                    {copied ? 'Copiado!' : 'Copiar'}
                </button>
            </p>
        </div>
    );
}

export default Profile;