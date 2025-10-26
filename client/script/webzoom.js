const webzoom=(value)=>{
    const value_=2*(+value)/100
    find("#webzoom>h4")[0].textContent="网页缩放："+value+"%"
    /* find("html")[0].style.fontSize="min("+value_+"vh,"+value_+"vw)" */
    save("test",value)
    notice(
        "网页缩放",
        +value===114
        ?"成功将*114514 1919810*\n调节为：哼哼哼 啊啊啊啊"
        :"成功将比例调节为：*"+value+"%*"
    )
    return value
}