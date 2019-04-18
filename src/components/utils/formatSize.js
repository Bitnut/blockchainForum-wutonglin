function FormatSize(bytes){
        var sizes = ['Bytes','KB','MB','GB','TB'];
        if (bytes == 0) return 'n/a';
        var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return (bytes / Math.pow(1024, i)).toFixed(1) + ' ' + sizes[i];
    };


/**
 * 

console.log(FormatSize(123));     //123.0 Bytes
console.log(FormatSize(123456));    //120.6 KB
console.log(FormatSize(777777777));    //741.7 MB
console.log(FormatSize(88888888888));    //82.8 GB
console.log(FormatSize(9999999999999));    //9.1 TB
 * 
 */