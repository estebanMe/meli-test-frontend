import React from 'react';

export const FormatNumber= ({value}) => {
    const number = new Intl.NumberFormat('es').format(value);
    return (
        <span>{number}</span>
    );
}