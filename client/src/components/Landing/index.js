import React from 'react';
import Typography from "@mui/material/Typography";
import Link from '@mui/material/Link';
import { useNavigate } from 'react-router-dom';
import AppBarComponent from '../AppBar';

const Landing = () => {
    const navigate = useNavigate();
    return (
        <div>
            <AppBarComponent />
            
            <div style={{ margin: '20px', textAlign: 'center' }}>
                    <Typography variant="h3" color="primary" noWrap style={{ fontWeight: 'bold' }}>
                        Welcome to Popcorn Wars!
                    </Typography>
                    <Typography variant="h6" color="secondary" noWrap style={{ fontWeight: 'bold' }}>
                        "Unveiling the Movie Popcorn Phenomenon"
                    </Typography>
                </div>
                <div style={{marginLeft: '200px', marginRight: '200px', textAlign: 'center' }}>
                    <h5 style={{ lineHeight: '2.5' }}>
                        Search for what movies kept people eating the popcorn and what movies caused popcorn wars! With Popcorn Wars, embark on a thrilling cinematic journey as we delve into the movies that kept audiences munching their popcorn and those that sparked passionate debates. You're invited to contribute your insights under the review tab, shaping the conversation and enhancing the movie-watching experience for everyone. So, grab your popcorn and get ready for an exciting adventure through the world of film!
                    </h5>
                </div>
            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/TopPicks')}
            >
            </Link>

            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/Search')}
            >
            </Link>
            <Link
                color="inherit"
                style={{ cursor: "pointer" }}
                onClick={() => navigate('/Review')}
            >
            </Link>
        </div>
    )
}

export default Landing;
