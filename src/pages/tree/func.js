

export const mergeKeys = (obj, t, m) => {
    obj.children = [];
    let children = obj.children;


    if (obj[t]) {
        let tar = obj[t];
        children = [
            ...children,
            ...tar
        ];
    }
    if (obj[m]) {
        let mov = obj[m];
        children = [
            ...children,
            ...mov
        ];
    }
    
    obj.children = children;
    delete obj[t];
    delete obj[m];




    if (children.length > 0) {
        for (let i = 0; i < children.length; i++) {
             
            let child = children[i];
            mergeKeys(child, t, m);
        }
    }else{

    }

    if(obj.type==3){
        obj.loading = true;
    }
    if(obj.type!==1){
        // 文件夹
        // type:isFolder?'ios-folder-outline': "ios-paper-outline"
        obj.iconType='ios-folder-outline'
    }else{
        obj.iconType='ios-paper-outline'
    }

    return obj;



}