import { Grid, Button } from "@mui/material";
import Badge from '@mui/material/Badge';
import favorite from "../../assets/icons/favorite.svg";
import favorite_filled from "../../assets/icons/favorite-filled.svg";
import facts from "../../assets/icons/facts-soft.svg";
import cart from "../../assets/icons/cart.svg";
import { useSelector } from "react-redux";
import AddIcon from '../../assets/icons/add.svg';
import "./index.css";
import { useEffect, useRef, useState } from "react";

const Header = () => {
    const cartCount = useSelector((state) => state.cart.value);
    const favRef = useRef(null);

    const handleFav = () => {
        if (favRef.current.src == favorite_filled) {
            favRef.current.src = favorite;
        }else{
            favRef.current.src = favorite_filled;
        }
    }

    const handleCart = () => {
        // dispatch(cartActions.incrementByAmount(Number(unitRef?.current?.value)));
    }

    return (
        <>
        <Grid container className="headerContainer">
            <Grid item lg={8} className="headerContainer-item">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </Grid>
            <Grid item lg={3.5} className="headerContainer-item2">
            <div className="cartButton" id="cartButton" style={{ marginRight:"1rem", alignItems:"center", verticalAlign:"bottom"}}>
            <input type="number" className="unitsCount" name="units" id="unitsCount" defaultValue={1} />
            <span style={{marginLeft:"0.3rem", marginRight:"1rem"}}>PCE</span>
            <Button variant="contained" className="addCart" onClick={handleCart} color="error" style={{textTransform:"none", height:"32px"}} startIcon={<img src={AddIcon} className="addIcon" height={12} width={12} alt="add" />}>
            Add to Cart
            </Button>
            </div>
                <img src={favorite} ref={favRef} height={24} width={24} alt="favorite" onClick={handleFav} />
                <img className="factImg" src={facts} height={28} width={28} alt="facts" />
            </Grid>
            <Grid item lg={0.5} className="headerContainer-item3">
            <Badge badgeContent={cartCount} color="error">
                <img src={cart} height={24} width={24} alt="cart" />
            </Badge>
            </Grid>
        </Grid>
        </>
    )
}

export default Header;