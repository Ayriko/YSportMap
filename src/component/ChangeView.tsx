import { useMap } from 'react-leaflet'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line react/prop-types
function ChangeView({ center }) {
    const map = useMap();
    map.setView(center,  map.getZoom())
    return null;
}

export default ChangeView