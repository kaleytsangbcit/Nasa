import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import Head from "next/head";

export default function Polychromatic() {
    const [image, setImage] = useState([]);
    const [images, setImages] = useState([]);
    const [time, setTime] = useState("Loading");
    const [date, setDate] = useState("");
    const [coords, setCoords] = useState({});

    const apiKey = "wlOrjgHbKCCpWrLY5GQxmg9XPwErk9B1QZXWDkbs";
    const url = `https:///epic.gsfc.nasa.gov/api/natural?api_key=${apiKey}`;

    const getPolyChromaticData = async () => {
        const res = await axios.get(url);
        const data = res.data;
        console.log(data);

        const caption = data[0].caption;
        const date = data[0].date.split(" ")[0];

        const date_formatted = date.replaceAll("-", "/");
        console.log(date_formatted);

        let times = [];
        let images = [];

        for (let i = 0; i < data.length; i++) {
            let time = data[i].date.split(" ")[1];
            let coords = data[i].centroid_coordinates;
            let imagePath = data[i].image;
            let image = `https://epic.gsfc.nasa.gov/archive/natural/${date_formatted}/png/${imagePath}.png`;

            times.push(time);
            images.push({
                image: image,
                time: time,
                coords: coords,
            });
        }

        setDate(date);
        setImages(images);
        setImage(images[0].image);
        setTime(time[0]);
        setCoords([images[0].coords.lat, images[0].coords.lon]);

        console.log(image);
    };

    useEffect(() => {
        getPolyChromaticData();
    }, []);

    return (
        <>
            <Head>
                <title>NASA Minisite</title>
                <meta name="description" content="Nasa Minisite" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/nasa-logo.png" />
            </Head>

            <div className={styles.polymain}>
                <div className={styles.headcon}>
                    <p>
                        Daily Imagery Collected by DSCOVR's Earth Polychromatic
                        by NASA{" "}
                    </p>

                    <Image src={image} alt={image} width={400} height={400} />

                    <div className={styles.headtitle}>
                        <div>Time: {time}</div>
                        <div>Latitude: {coords[0]}</div>
                        <div>Longitude: {coords[1]}</div>
                    </div>
                </div>

                <table className={styles.table}>
                    <thead>
                        <tr className={styles.thead}>
                            <th>Time</th>
                            <th>Latitude</th>
                            <th>Longitude</th>
                            <th>Image</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {images.map((e, i) => {
                            return (
                                <tr className={styles.thead} key={i}>
                                    <td>{e.time}</td>
                                    <td>{e.coords.lat}</td>
                                    <td>{e.coords.lon}</td>
                                    <td>
                                        <Image
                                            src={e.image}
                                            alt={e.image}
                                            width={200}
                                            height={200}
                                        />
                                    </td>
                                    <td>
                                        <button
                                            className={styles.button}
                                            onClick={() => {
                                                setImage(e.image);
                                                setTime(e.time);
                                                setCoords([
                                                    e.coords.lat,
                                                    e.coords.lon,
                                                ]);
                                                console.log(images[i].image);
                                                document.body.scrollIntoView();
                                            }}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>

                <div className={styles.image}>
                    <img src="/man.png" />
                </div>
            </div>
        </>
    );
}
