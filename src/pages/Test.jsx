import React, {useEffect, useState} from "react";

/*
Created by: kongvut  Sangkla
Updated at: 2023-08-04 22:18
Resource from: https://github.com/kongvut/thai-province-data
*/
import '../assets/test.css'

export default function Test() {
    const [provinces, setProvinces] = useState([]);
    const [amphures, setAmphures] = useState([]);
    const [tambons, setTambons] = useState([]);
    const [selected, setSelected] = useState({
        province_id: undefined,
        amphure_id: undefined,
        tambon_id: undefined
    });

    useEffect(() => {
        (() => {
            fetch(
                "https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json"
            )
                .then((response) => response.json())
                .then((result) => {
                    setProvinces(result);
                });
        })();
    }, []);

    const DropdownList = ({label, id, list, child, childsId = [], setChilds = []}) => {
        const onChangeHandle = (event) => {
            setChilds.forEach((setChild) => setChild([]));
            const entries = childsId.map((child) => [child, undefined]);
            const unSelectChilds = Object.fromEntries(entries);

            const input = event.target.value;
            const dependId = input ? Number(input) : undefined;
            setSelected((prev) => ({...prev, ...unSelectChilds, [id]: dependId}));

            if (!input) return;

            if (child) {
                const parent = list.find((item) => item.id === dependId);
                const {[child]: childs} = parent;
                const [setChild] = setChilds;
                setChild(childs);
            }
        };

        return (
            <>
                <label htmlFor={label}>{label}</label>
                <select value={selected[id]} onChange={onChangeHandle}>
                    <option label="Select ..."/>
                    {list &&
                        list.map((item) => (
                            <option
                                key={item.id}
                                value={item.id}
                                label={`${item.name_th} - ${item.name_en}`}
                            />
                        ))}
                </select>
            </>
        );
    };

    return (
        <>
            <div className="sidebar">
                <a className="active" href="#home">Home</a>
                <a href="#news">News</a>
                <a href="#contact">Contact</a>
                <a href="#about">About</a>
            </div>
        </>
    )
}
