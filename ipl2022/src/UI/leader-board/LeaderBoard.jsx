import React from 'react';
import classes from './LeaderBoard.module.scss';

const LeaderBoard = () => {
  return (
    <div className={classes.parent}>
      <div className={classes.child}>
        <div className={classes.child_1}>
          <div className={classes.line}></div>
          <div className={classes.vl}></div>
          <div className={classes.container1}>
            <div className={classes.item1}>
              <div className={classes.innerr1}>
                <img src={''} className={classes.card_image} alt="" />
                <p className={classes.card_name + ' ' + classes.txtbg}> </p>
                <img src={''} className={classes.card_image} />
                <p className={classes.txtbg}> </p>
              </div>
            </div>
            <div className={classes.item2}>
              <div className={classes.innerr2}>
                <img src={''} className={classes.card_image2} alt="" />
                <p className={classes.card_name + ' ' + classes.txtbg}> </p>
                <img src={''} className={classes.card_image2 + ' ' + classes.pp2} />
                <p className={classes.txtbg}> </p>
              </div>
            </div>
            <div className={classes.item3}>
              <div className={classes.innerr3}>
                <img src={''} className={classes.card_image3} alt="" />
                <p className={classes.card_name + ' ' + classes.txtbg}></p>
                <img src={''} className={classes.card_image3 + ' ' + classes.pp3} />
                <p className={classes.txtbg}> </p>
              </div>
            </div>
          </div>
          <div className={classes.vl1}></div>
          <div className={classes.line}></div>

        </div>
        <div className={classes.child_2}>
          
        </div>
      </div>
    </div>
  )
}

export default LeaderBoard;