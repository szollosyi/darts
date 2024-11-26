import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const DartsList = () => {
    const [darts, setDarts] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => { // fetch-api átírása axios-ra!
        setPending(true);
        axios.get('https://darts.sulla.hu/darts')
        .then(valasz => setDarts(valasz.data))
        .catch(hiba => console.log(hiba))
        .finally(() => setPending(false));
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center">Darts játékosok</h2>
        {isPending ? (<div className="spinner-border"></div>) : (
            <div className="row row-cols-1 row-cols-md-3 g-4">
                
                {darts.map((dart, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100">
                    <p className="text-dark text-center">Darts játékos neve: {dart.name}</p>
                    <p className="text-dark text-center">Születési éve: {dart.birth_date}</p>
                    <p className="text-dark text-center">Megnyert világbajnokságai: {dart.world_ch_won}</p>
                    <div className="card-body d-flex flex-column align-items-center">
                        <Link to={dart.profile_url} className="fs-5" target="_blank">Profil link</Link><br />
                        <Link key={dart.id} to={"/darts/" + dart.id}><img src={dart.image_url ? dart.image_url : 
                            "https://via.placeholder.com/400x800"} alt={dart.name} 
                            className="img-fluid" style={{width: "200px"}}/></Link>
                       </div>
                       <div className="text-center">
                       <Link to={"/darts/" + dart.id}><i className="bi bi-text-paragraph fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/mod-darts/" + dart.id}><i className="bi bi-pencil-square fs-3"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/del-darts/"+ dart.id}><i className="bi bi-trash3 fs-3"></i></Link>
                        </div>
                    </div>
                    </div>
                ))}
            </div>
        )}
        </div>
    );
};