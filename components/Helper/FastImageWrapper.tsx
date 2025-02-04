import React, { useEffect, useMemo, useState } from 'react';
import { ImageStyle } from 'react-native';
import FastImage, { FastImageProps, Source } from 'react-native-fast-image';

import DefaultHotel1 from '@/assets/images/hotels/default-hotel-1.jpg';
import DefaultHotel2 from '@/assets/images/hotels/default-hotel-2.jpg';
import DefaultHotel3 from '@/assets/images/hotels/default-hotel-3.jpg';
import DefaultHotel4 from '@/assets/images/hotels/default-hotel-4.jpg';
import DefaultHotel5 from '@/assets/images/hotels/default-hotel-5.jpg';

const DEFAULT_IMAGES = [DefaultHotel1, DefaultHotel2, DefaultHotel3, DefaultHotel4, DefaultHotel5];

type FastImageWrapperProps = FastImageProps & {
    source: Source;
    style?: ImageStyle;
};

const FastImageWrapper: React.FC<FastImageWrapperProps> = ({ source, style, ...props }) => {
    const [validSource, setValidSource] = useState<Source>(source);

    const defaultImage = useMemo(() => {
        const index = Math.floor(Math.random() * DEFAULT_IMAGES.length);
        return DEFAULT_IMAGES[index];
    }, []);

    useEffect(() => {
        if (typeof source === 'object' && source.uri) {
            fetch(source.uri, { method: 'HEAD' })
                .then((res) => {
                    if (res.status === 404) {
                        setValidSource(defaultImage);
                    }
                })
                .catch(() => setValidSource(defaultImage));
        }
    }, [source, defaultImage]);

    return <FastImage source={validSource} style={style} {...props} />;
};

export default FastImageWrapper;
