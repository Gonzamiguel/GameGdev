import React from 'react';
import data from '../data.js';
import Button from './button.jsx';
import Title from './Title.jsx';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>
        <Title title={"Games GDev"}/>
        <section className='flex flex-col md:flex-row justify-center gap-10 m-10'>
            
            {data.map((game, index) => (
                <div key={index} className="rounded-lg shadow-md p-4 md:w-[350px] bg-[#1A1423]">
                    <Link to={`/${game.name.toLowerCase().replace(/\s+/g, '-')}`}> {/* Envolver la tarjeta con el Link y construir la ruta */}
                        <img src={game.image} alt={game.name} className="w-full h-auto mb-4" />
                        <div className='flex gap-x-4'>
                            <h2 className="text-lg font-semibold">{game.name}</h2>
                            <p className="flex items-center bg-[#228BE6] text-sm rounded-xl p-1 bg-opacity-30">{game.category}</p>
                        </div>
                        <p>{game.description}</p>
                        <Button text={"Ir al juego"}/>
                    </Link>
                </div>
            ))}
        </section>
        </>
    );
}

export default Index;
