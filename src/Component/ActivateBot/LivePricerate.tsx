import React from 'react';
import '../../Liveratebox.css';

interface LivePriceBoxProps {
  pricePerGram: number;
  purity: string;
}

const LivePriceBox: React.FC<LivePriceBoxProps> = ({ pricePerGram, purity }) => {
  return (
    <div className="gold-calculator livePrice_box">
      <div className="livePrice_buy">
        <span>Live Buy Price</span>
        <h4>₹ {pricePerGram.toFixed(2)} /g</h4>
      </div>
      <div className="livePrice_purity">
        <span>Purity</span>
        <h4>{purity}</h4>
      </div>
    </div>
  );
};

export default LivePriceBox;
