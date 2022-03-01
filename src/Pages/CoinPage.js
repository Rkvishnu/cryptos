import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { makeStyles, Typography, LinearProgress } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { useParams } from 'react-router-dom'
import { SingleCoin } from '../config/api'
import { CryptoState } from '../CryptoContext';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from "../components/CoinsTable";

///////////////===========



const CoinPage = () => {

  const { id } = useParams();  // destructuring 

  const [coin, setCoin] = useState();

  const { currency, symbol } = CryptoState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));

    setCoin(data);
  };

  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },

    },

    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },

    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    }

  }));
  const classes = useStyles();

  if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;


  return (

    //this div👇👇  will be of two part

    <div className={classes.container}>
      {/* //1. */}
      <div className={classes.sidebar}>

        {/* // image is coming from  coingecko api */}

        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography
          variant="h3"
          className={classes.heading}>
          {coin?.name}

        </Typography>

        <Typography variant="subtitle1" className={classes.description}>
          {ReactHtmlParser(coin?.description.en.split(". ")[0])}.

        </Typography>
        <div>
          <sapn style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Rank:
            </Typography>
            &nbsp;
            <Typography variant="h5">{coin?.market_cap_rank} </Typography>


          </sapn>
          <sapn style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Current Price:

            </Typography>
            &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>


          </sapn>  <sapn style={{ display: "flex" }}>
            <Typography
              variant="h5" className={classes.heading}>
              Market Cap:
            </Typography>
            &nbsp;

            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
              M
            </Typography>

          </sapn>

        </div>
      </div>

      {/*2. chart part  */}
      <CoinInfo coin={coin} />
    </div>
  );
};

export default CoinPage