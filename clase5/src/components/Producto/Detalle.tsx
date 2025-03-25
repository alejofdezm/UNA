import React, {useEffect, useState} from 'react';


interface DetalleProps {
    title: string;
    price?: number;
    description?: string;
}

const Detalle = ({title, price, description} : DetalleProps) => {
   
    

    return (
        <div>
            <h1>Detalle del producto</h1>
            <br />
            <h2> {title}</h2>
        </div>
    )
}

export default Detalle;
    