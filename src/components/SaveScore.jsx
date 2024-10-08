import { Button } from '@mui/material';
import { useContext, useState } from 'react';
import { FirebaseContext } from '../context/FirebaseContext'; 
import { GameContext } from '../context/GameContext';
import { useTranslation } from 'react-i18next';

const SaveScore = ({ score }) => {
    const { saveScore } = useContext(FirebaseContext); 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const { setScore } = useContext(GameContext);
    const { t } = useTranslation();
    const handleSubmit = async (e) => {
        e.preventDefault();
            await saveScore({ score, name, email });
            setScore(0)
    }
    return (
        <div className='h-full flex items-center text-white flex-col px-4'>
            <div>
                <h1 className='text-3xl md:text-4xl flex flex-col text-center'>
                    {t("You scored")}:
                    <span className='font-bold text-6xl md:text-8xl'>{score}</span>
                </h1>
            </div>
            <form className="w-full max-w-xs sm:max-w-sm md:min-w-[400px] mt-8 flex flex-col items-center" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-6 group">
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="name"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("Enter your name")}
                    </label>
                </div>

                <div className="relative z-0 mb-6 w-full group">
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        htmlFor="email"
                        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
                    >
                        {t("Enter your email")}
                    </label>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <Button type='submit' variant="contained">{t("Submit")}</Button>
            </form>
        </div>
    );
};

export default SaveScore;
