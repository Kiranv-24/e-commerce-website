import React from 'react';

const GeneralButton = ({ label, icon, count, onClick }) => {
    return (
        <button className="general-button" type="button" onClick={onClick} style={{ display: 'flex', alignItems: 'center', position: 'relative', gap: '10px' }}>
            {icon && <img src={icon} alt={label} width="24" height="24" />}
            {count > 0 && (
                <div className="cart-count">
                    {count}
                </div>
            )}
            <div>{label}</div>
        </button>
    );
};

export default GeneralButton;
