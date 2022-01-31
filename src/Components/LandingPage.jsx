import React, {useEffect, useState} from 'react';
import logo                         from '../assets/logo/logo@1x.png';
import progressBar                  from '../assets/icons/progress@2x.png';
import bell                         from '../assets/icons/notify-me@2x.png';
import axios                        from 'axios';
import money                        from '../assets/icons/money-bag@2x.png';
import google                       from '../assets/icons/google-play@2x.png';
import apple                        from '../assets/icons/ios-app@2x.png';
import { Container }                 from 'react-bootstrap';

const LandingPage = () => {
    //States
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [allImages, setAllImages] = useState([])

    //Loading on Boot
    useEffect(() => {
            const directory = require.context("../assets/headshots", false, /\.(png|jpe?g|svg)$/)
            setAllImages(() => getImagePaths(directory), console.log(allImages))
            axios.get('./playline-test.json')
            .then((response) => { setData(response.data.players); setLoading(true)
        })
        .catch((error) => {
        console.log(error);
    });   
    }, [loading]);

    //Retrieve all image names
    function getImagePaths(directory) {
        let images = [];
        directory.keys().map((item, index) => images.push(item.replace("./", "")));
        return images;
      }


return (
<>
{loading && (
    <Container fluid className='container'>
        <div className='logoColumn'><img src={logo} alt='logo'/></div>
    <div>
        <div className='box'>
            <div className="playerInfo">
                <img className = 'progressBar' src={progressBar} alt='progress bar'/>
                <h1>YOUR PLAYLINE IS SET!</h1>
                <h2>COME BACK @ 7:30PM TO TRACT IT LIVE</h2>
                <div className='borderBox'></div>
                <p>Pro Tip: You can manage your PlayLine's until they go live in the Upcoming area</p>
                <div className= 'playerContainer'>
               {data && data.map((players, index) => {
                    return (
                    <div className="playerBox">
                        {allImages && allImages
                        .filter(name => name.includes(players.last_name))
                        .map((image, index) => {
                            return ( <img className='headShots' src= {`../assets/headshots/${image}`}alt= 's'/>)
                        })}
                        <h3>{players.last_name}</h3>
                        <h4 className='number'>{players.points}</h4>
                        <h3>PTS</h3>
                    </div>
               )})} 
            </div>
            <div className='Buttons'>
                <div className="button">
                    <img src={bell} alt="icon"/>
                    <h3 className='buttonText'>NOTIFY ME</h3>
                </div>
                <div className="button">
                    <img src={money} alt="icon"/>
                    <h3 className='buttonText'>DEPOSIT</h3>
                </div>
            </div>
            <div className='borderBoxGrey'></div>
            <h4>DOWNLOAD THE APP</h4>
            <div className='Buttons'>
                <img src={google} alt="icon"/>
                <img src={apple} alt="icon"/>
            </div>
            </div>
        </div>
    </div>
    <div className='links'>
        <a>ABOUT</a><a>|</a><a>PLB BONUS</a><a>|</a><a>CONTACT0</a>
        <a>SECURITY</a><a>|</a><a>RESPONSIBLE PLAY</a><a>|</a>
        <a>PRIVACY</a><a>|</a><a>TERMS</a><a>|</a>
    </div>
  </Container>
)}
</>
  
  )};

export default LandingPage;
