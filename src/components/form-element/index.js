import { Input } from '@/components/ui/input';

function CommonElement({item, value, onChange}){
    let content = null;
    switch (item.componentType) {
        case 'input':
            content = (<Input
                name={item.name}
                id={item.name}
                placeholder={item.placeholder}
                value={value}
                onChange={onChange}
                type={item.type}
            />);
            break;
    
        default:
            content = (<Input
                name={item.name}
                id={item.name}
                placeholder={item.placeholder}
                value={value}
                onChange={onChange}
                type={item.type}
            />);
            break;
    }
    return content;
}

export default CommonElement;