import React, { useState } from 'react'
import { Btn, H2, H6, Image, P } from "../../../AbstractElements";
import { dynamicImage } from "../../../Service";

export default function CouponCode(props: { isApplicable: string; couponCode?: string }) {
    const [userName, setuserName] =useState(localStorage.getItem('UserName'));
    const [MemberName, setMemberName] =useState(localStorage.getItem('MemberName'));
    // console.log(props?.couponCode);
    
    return (
        <>
            {props?.isApplicable === "Y" ? (
                <div className="coupon">
                    <div className="couponleft">
                        <div>FXSTOCK CORPORATION</div>
                    </div>
                    <div className="centerdiv">
                        <div>
                        <Image className="w-75 bg-dark mb-1" alt='popimage' title='popImage' src={dynamicImage("logo2.png")} />
                            <h2 className="cCode">{props?.couponCode}</h2>
                            <small>{MemberName}</small>
                            <div><small>[{userName}]</small></div>
                        </div>
                    </div>
                    <div className="couponright">
                        <div className="cCode">{props?.couponCode}</div>
                    </div>
                </div>
            ) : (
                <div className="notEligible" style={{marginTop:'-20px'}}>
                    <p style={{color:'#43B9B2 '}}>You are not eligible for a coupon.</p>
                    <p style={{color:'#43B9B2 '}}>In order to get a coupon and win exciting prizes, you need to:</p>
                    <ul>
                        <li style={{color:'#43B9B2 '}}>Invest $3000 or more</li>
                        <li style={{color:'#43B9B2 '}}>Or have your direct member's investment reach $3000</li>
                        <li style={{color:'#C280D2 '}}>Validity: 1 OCT 2024 TO 31 DEC 2024</li>
                    </ul>
                </div>
            )}
        </>
    )
}
