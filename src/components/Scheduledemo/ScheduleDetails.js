import React from 'react'
import classes from '../Scheduledemo/Scheduledemo.module.css'
import laptop from '../../Content/images/laptop.PNG'
const ScheduleDetails = () => {
    return (
        <div id="schedule-form">
            <b className={classes['heading']} style={{paddingLeft: '5%'}}>Schedule live demo of LoRRI</b>
            <div style={{width: '5%'}}></div>
            <span style={{width: '5%'}}></span>
            <div className={classes['intro']}>
                <span className={classes['text']}>
                Thank you for your interest in LoRRI. See how our end to end logistics platform with 
                data integrated from both demand and supply can address your problems with comprehensive demo.
                </span>
                <center><img alt='img' className={classes['laptop']} src={laptop}></img></center>
                <span className={classes['text']}>
                We'll connect with you for quick demo so we can show you how LoRRI can:
                <ol className={classes['text1']}>
                    <li>Enable you to manage Operations, Procurements, Auctions seamlessly.</li>
                    <li>Get your Auctionable insights enabling savings and reducing risks.</li>
                    <li>Help you discover best suited Industry Rated Transporters.</li>
                </ol>
                </span>
            </div>
        </div>
    )
}

export default ScheduleDetails
