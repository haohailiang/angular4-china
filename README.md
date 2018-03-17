# 创建项目用到的命令
## 卸载@angular/cli包
```
sudo npm uninstall -g @angular/cli
```
## 清理npm包的缓存
```
npm cache clean
```
## 安装@angular/cli最新包
```
sudo cnpm i -g @angular/cli@latest
```
## 查看安装的版本号
```
ng version
```
## 新建项目
```
sudo ng new angular4-china --skip-install
sudo ng new angular4-china -si --style=scss
```
## 进入文件夹安装[一定要用sudo,不然有些包安装不上, 在控制台上安装会比在IDE中安装成功率高]
```
sudo cnpm i
cnpm install
```
## 修改文件夹权限
```
sudo chown -R haohailiang ./../angular4-china/
```
## 启动项目
```
sudo ng serve --open
ng serve -o
```

## 创建heros组件
```
ng generate component heroes
ng g c hero-detail --spec=false
# 碰见异常删除node_modules重新安装
```
## 提供service给指定的module
```
ng generate service hero
ng g s heroes/hero --spec=false --module=app
ng generate service heroes/hero --module=app
```