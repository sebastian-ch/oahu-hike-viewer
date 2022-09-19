import { useRef, useState, useEffect } from 'react';
//@ts-ignore
import mapboxgl from '!mapbox-gl' // eslint-disable-line import/no-webpack-loader-syntax
import bbox from '@turf/bbox';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function Map({ geojson, center }: any) {

    mapboxgl.accessToken = 'pk.eyJ1IjoiYXBwYTAxNCIsImEiOiJjaXFiZ2Jzb2owMG5mZmpucHRxczd3ZnhqIn0.5ywr6-GhZUGWdL3VwPuESg'
    const mapContainer = useRef<any>(null);
    const map = useRef<mapboxgl.Map | null>(null);
    const [lng, setLng] = useState(-157.964);
    const [lat, setLat] = useState(21.478);
    const [zoom, setZoom] = useState(10);

    useEffect(() => {
        if (map.current) return; // initialize map only once
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: center,
            zoom: zoom
        });

        //@ts-ignore
        map.current.on('load', () => {
            //console.log(geojson);

            map.current?.addSource('hikes', {
                type: 'geojson',
                data: geojson
            })

            map.current?.addLayer({
                id: 'hikes',
                type: 'line',
                source: 'hikes'

            })
        })


    }, [])


    useEffect(() => {

        //map.current?.setCenter(center)
        //console.log(center);
        if (center.length != 2) {
            const bbox1: any = bbox(center);
            //console.log(bbox1);
            map.current?.fitBounds(bbox1, { padding: 50 });
        }

    }, [center])

    return <div style={{ width: '70vw', height: '90%' }} ref={mapContainer} className="map-container" />

}