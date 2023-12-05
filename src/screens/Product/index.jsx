import React,{ useRef, useState } from "react";
import { useDispatch } from 'react-redux'
import { incrementByAmount } from '../../store/cartSlice';
import { Card, CardContent, Container, Grid, Divider, List, ListItemText, ListItem, ListItemIcon, Chip, Stack, Rating, Button, Box } from "@mui/material";
import CircleIcon from '@mui/icons-material/Circle';
import AddIcon from '../../assets/icons/add.svg';
import discountImg from '../../assets/icons/discount.svg';
import product1_1 from '../../assets/images/product1-1.webp';
import product2_1 from '../../assets/images/product2-1.webp';
import product3_1 from '../../assets/images/product3-1.webp';
import product1 from '../../assets/images/product1.webp';
import product2 from '../../assets/images/product2.webp';
import product3 from '../../assets/images/product3.webp';
import zoom from '../../assets/icons/zoom-in.svg';
import zoomOutIcon from '../../assets/icons/zoom-out.svg';
import CustomList from "../../components/List";
import "./index.css";
import data from "../../data/data.json";
import { cartActions } from "../../store/cartSlice";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const Product = () => {
    const {article} = data;
    const dispatch = useDispatch();
    const [value, setValue] = useState(article?.stars ?? 0);
    const unitRef = useRef(null);
    const [productImage, setProductImage] = useState(product2);
    const features = Object.entries(article?.features);
    const attachments = Object.values(article?.attachments);
    const transformComponentRef = useRef(null);

    const zoomToImage = () => {
      if (transformComponentRef.current) {
        const { zoomToElement } = transformComponentRef.current;
        zoomToElement("imgExample");
      }
    };

    const priceBreaks = Object.entries(article?.price_breaks).map(item => {
        return (
            <>
            <div style={{fontWeight:"600", display:"flex", gap:"2rem"}}>
                <span>{`${item[0]} ${article?.unit}`}</span>
                <span>{`${item[1]} ${article?.currency}/${article?.unit}`}</span>
            </div>
            <Divider variant="middle" sx={{my:2}} />            
            </>
        )
    });

    const Keywords = Object.values(article?.keywords).map(item => {
        return (
            <Chip label={item} style={{color:"rgba(0,0,0,0.6)"}} />
        )
    })

    const Controls = ({ zoomIn, zoomOut, resetTransform }) => (
        <>
          <button style={{position:"absolute", bottom:10, right:10, zIndex:10, padding:"0.325rem"}} onClick={() => zoomIn()}>
          <img src={zoom} height={18} width={18} alt="zoom icon" />
          </button>
          <button style={{position:"absolute", bottom:"15%", right:10, zIndex:10, padding:"0.325rem"}} onClick={() => zoomOut()}>
          <img src={zoomOutIcon} height={18} width={18} alt="zoom out icon" />
          </button>
          {/* <button style={{position:"absolute", bottom:10, right:10, zIndex:10}} onClick={() => resetTransform()}>x</button> */}
        </>
      );

    const handleImgChange = (e) => {
        setProductImage(e);
    }

    const handleCart = () => {
        dispatch(cartActions.incrementByAmount(Number(unitRef?.current?.value)));
    }

    return (
        <>
        <Container maxWidth="xl" style={{paddingTop:"1rem", paddingBottom:"1rem"}}>
            <div className="productContainer" style={{display:"flex", gap:"1rem", flexDirection:"row"}}>
            <div style={{display:"flex", gap:"1rem", flexDirection:"column"}}>
            <img src={product1_1} height={100} width={100} alt="product" onClick={()=>handleImgChange(product1)} className="productImg" />
            <img src={product2_1} height={100} width={100} alt="product" onClick={()=>handleImgChange(product2)} className="productImg" />
            <img src={product3_1} height={100} width={100} alt="product" onClick={()=>handleImgChange(product3)} className="productImg" />
            </div>
            <div style={{position:"relative", zIndex:0}}>
            <TransformWrapper
      initialScale={1}
      initialPositionX={0}
      initialPositionY={0}
      ref={transformComponentRef}
    >
      {(utils) => (
        <React.Fragment>
          <Controls {...utils} />
          <TransformComponent>
          <img style={{position:"relative", width:"440px", zIndex:0}} src={productImage} height="350px" width="30%" alt="product" className="productImg" />
            {/* <div onClick={zoomToImage}></div> */}
          </TransformComponent>
        </React.Fragment>
      )}
    </TransformWrapper>
            </div>
            <div>
            <div className="productTitle">{article?.title}</div>
           <div><span style={{opacity:0.8, fontSize:"0.875rem"}}>by</span> <a href={article?.supplier_link} className="hyperLink">{article?.supplier_name}</a></div>
            <Rating 
            value={value}
            style={{marginTop:"0.5rem"}}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            />
            <div className="productPrice">{`${article?.price} ${article?.currency}`} <span className="transportCost">{`+${article?.transport_costs} ${article?.currency} shipping`}</span> <img src={discountImg} className="discountImg" height={16} width={16} alt="discount" /></div>
            <div className="productTax">{`all prices incl. ${article?.vat_percent}% taxes`}</div>
            <div className="unitsCart" style={{marginTop:"10rem"}} id="unitsCart">
            <input type="number" className="unitsCount" name="units" id="unitsCount" ref={unitRef} defaultValue={1} />
            <span style={{marginLeft:"0.3rem", marginRight:"1rem"}}>{article?.unit}</span>
            <Button variant="contained" className="addCart" onClick={handleCart} color="error" style={{textTransform:"none", height:"32px"}} startIcon={<img src={AddIcon} className="addIcon" height={12} width={12} alt="add" />}>
            Add to Cart
            </Button>
            </div>
            </div>
            </div>
        </Container>
        <Container maxWidth="xl" className="sectionContainer">
            <div className="sectionTitle" sx={{p:2}}>DESCRIPTION</div>
            {data?.article?.description_short}
            <br></br>
            {data?.article?.description_long}
            <Grid container spacing={2} sx={{my:2}}>
            <Grid item xs={6}>
            <Card style={{boxShadow:"none"}}>
                <CardContent>
                <div className="cardTitle">DETAILS</div>
                <Divider variant="middle" sx={{my:2}} />
                <div className="subCardTitle">Features</div>
                <CustomList 
                data={features} 
                keyValue= {true} 
                icon = "circle"
                type="multiple"
                />
                <div className="subCardTitle" style={{marginTop:"0.5rem"}}>Attachments</div>
                <CustomList 
                data={attachments}  
                icon = "attachment"
                type="attachments"
                />
                <div className="subCardTitle" style={{marginTop:"0.5rem", marginBottom: "0.5rem"}}>Keywords</div>
                <Stack direction="row" spacing={1}>
                    {Keywords}
                </Stack>
                </CardContent>
            </Card>
            </Grid>
            <Grid item xs={6}>
            <Card style={{boxShadow:"none", minHeight:"100%"}}>
                <CardContent>
                <div className="cardTitle">PRICING & SHIPPING</div>
                <Divider variant="middle" sx={{my:2}} />
                <List>
                    <ListItem disablePadding>
                        <ListItemIcon sx={{minWidth:0.03}}>
                            <CircleIcon sx={{ fontSize: 10, color:"black" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <span style={{opacity:0.8, fontSize:"0.875rem"}}>Minimum order</span>  : {article?.minimum_order_quantity} 
                        </ListItemText>
                 </ListItem>
                 <ListItem disablePadding>
                        <ListItemIcon sx={{minWidth:0.03}}>
                            <CircleIcon sx={{ fontSize: 10, color:"black" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <span style={{opacity:0.8, fontSize:"0.875rem"}}>Shipping</span>  : {article?.minimum_order_quantity} 
                        </ListItemText>
                 </ListItem>
                 <ListItem disablePadding>
                        <ListItemIcon sx={{minWidth:0.03}}>
                            <CircleIcon sx={{ fontSize: 10, color:"black" }} />
                        </ListItemIcon>
                        <ListItemText>
                            <span style={{opacity:0.8, fontSize:"0.875rem"}}>Delivery</span>  : {`${article?.delivery_time} Days`} 
                        </ListItemText>
                 </ListItem>
                </List>
                <div className="subCardTitle" style={{margin:"0.5rem"}}>Price breaks</div>
                <Divider variant="middle" sx={{my:2}} />            
            
                <Stack direction="column" spacing={1}>
                   {priceBreaks} 
                </Stack>
                </CardContent>
            </Card>
            </Grid>
            </Grid>
        </Container>
        </>
    )
}

export default Product;