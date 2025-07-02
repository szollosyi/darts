import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

export const DartsDel = () => {
    const { dartsId } = useParams();
    const navigate = useNavigate();
    const [darts, setDarts] = useState(null); // kezdetben null, nem üres objektum

    useEffect(() => {
        const fetchDarts = async () => {
            try {
                const res = await axios.get(`https://darts.sulla.hu/darts/${dartsId}`);
                setDarts(res.data);
            } catch (error) {
                console.error("Hiba a lekérés során:", error);
            }
        };
        fetchDarts();
    }, [dartsId]);

    const handleDelete = async () => {
        const confirmed = window.confirm("Biztosan törölni szeretnéd ezt a dartost?");
        if (!confirmed) return;

        try {
            await axios.delete(`https://darts.sulla.hu/darts/${dartsId}`);
            navigate("/"); // sikeres törlés után vissza
        } catch (error) {
            console.error("Hiba a törlés során:", error);
        }
    };

    if (!darts) return <p>Betöltés...</p>; // amíg betölt, mutass valamit

    return (
        <div className="p-1 m-auto text-center content bg-lavender">
            <h2>Dartozó</h2>
            <div className="card col-sm3 d-inline-block m-1 p-2">
                <p className="text-dark text-center fs-5"><b>Dartozó neve:<br />{darts.name}</b></p>
                <p className="text-danger">Születési éve: {darts.birth_date}</p>
                <p className="text-danger">Megnyert világbajnokságai: {darts.world_ch_won}</p>

                <div className="card-body">
                    <Link to={darts.profile_url} className="btn btn-success fs-6" target="_blank">
                        Profil link
                    </Link>
                    <br /><br />

                    <img
                        src={darts.image_url || "https://via.placeholder.com/200x300"}
                        alt={darts.name}
                        className="img-fluid"
                        style={{ width: "200px" }}
                    />
                    <br /><br />

                    {/* Gombok */}
                    <button onClick={handleDelete} className="bi bi-trash3 fs-5 btn btn-danger">
                        Törlés
                    </button>
                    &nbsp;&nbsp;
                    <Link to="/" className="bi bi-backspace fs-5 btn btn-warning">
                        Vissza
                    </Link>
                </div>
            </div>
        </div>
    );
};
