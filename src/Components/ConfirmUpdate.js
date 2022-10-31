import React from 'react'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QueryBuilderRoundedIcon } from '@mui/icons-material/QueryBuilderRounded';
import LinearProgress from '@mui/material/LinearProgress';

const ConfirmUpdate = (props) => {
  
    const [divi, setDivi] = useState(window.localStorage.getItem('division'));
  useEffect(() => {

    let myInterval = setInterval(() => {
        setDivi(window.localStorage.getItem('division'));
    }, 500)
    return () => {
      clearInterval(myInterval);
    };
  });
  return (
    <div className="timer">
<p className="HomePage_p">You spend <strong>{divi}%</strong> of your on <strong>Typing</strong> and <strong>{100 - divi}%</strong> of your time on <strong>Watching Videos</strong>:</p>

<p className="HomePage_p">You earn <strong>{((((divi / 100) * 600 * 0.75) / 100)+((((100 - divi) / 100) * 600 * 0.25) / 100)+3).toPrecision(2)}</strong> Euros.</p>

<p className="HomePage_p">You get <strong>{Math.floor((Math.round(((divi / 100)) * 600))/60)}</strong> minutes <strong>{((Math.round(((divi / 100)) * 600))%60)}</strong> seconds to <strong>Type.</strong></p>

<p className="HomePage_p">You get <strong>{Math.floor((Math.round((1-(divi / 100)) * 600))/60)}</strong> minutes <strong>{((Math.round((1-(divi / 100)) * 600))%60)}</strong> seconds to <strong>Watch Videos.</strong></p>

<p className="HomePage_p">
    Please <strong>move the slider</strong> if you want to change your choice.
</p>
    </div>
  )
}

export default ConfirmUpdate;