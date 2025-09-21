'use client';
import dynamic from "next/dynamic";
import React from "react";

// Dynamically import react-select
const Select = dynamic(() => import('react-select'), { ssr: false });

export default Select;
