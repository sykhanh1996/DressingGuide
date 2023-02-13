import clsx from 'clsx';
import { useRef, useEffect, memo } from 'react';
import { IColorItems } from '../SuggestedRadio/SuggestedRadio.view-model';
import styles from './ColorRadio.module.scss';

const ColorRadio = (colorItems: IColorItems) => {
    const liRef = useRef<any>([]);
    useEffect(() => {
        liRef.current.forEach((li: HTMLLIElement) => {
            const label = li.getElementsByTagName('label')[0] as HTMLLabelElement;
            label.style.backgroundColor =
                colorItems.colorArr.find((cl) => cl.id === label.htmlFor.slice(7))?.color || '';
            label.style.outlineColor =
                colorItems.colorArr.find((cl) => cl.id === label.htmlFor.slice(7))?.borderColor || '';

            setColorForParentComp(li, label);
        });
    });
    const handleChangeRadio = () => {
        liRef.current.forEach((li: HTMLLIElement) => {
            const label = li.getElementsByTagName('label')[0] as HTMLLabelElement;
            setColorForParentComp(li, label);
        });
    };
    const setColorForParentComp = (li: HTMLLIElement, label: HTMLLabelElement) => {
        const input = li.getElementsByTagName('input')[0] as HTMLInputElement;
        if (input.checked && colorItems.setColorValue) {
            colorItems?.setColorValue(colorItems.colorArr.find((cl) => cl.id === label.htmlFor.slice(7))?.color || '');
        }
    };
    return (
        <ul className={clsx('flex')}>
            {colorItems.colorArr.map((cl, index) => {
                return (
                    <li key={cl.id} ref={(el) => (liRef.current[index] = el)}>
                        <div className={clsx(styles.selectColor, 'flex items-center justify-center')}>
                            <input
                                type="radio"
                                id={'mainCl-' + cl.id}
                                name="mainColor-radio"
                                defaultChecked={index === 0}
                                onChange={handleChangeRadio}
                            />
                            <label
                                htmlFor={'mainCl-' + cl.id}
                                className="grid place-items-center shadow-md cursor-pointer"
                                ref={(el) => (liRef.current[index] = el)}
                            ></label>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};
export default memo(ColorRadio);
