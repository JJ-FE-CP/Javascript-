/**
 * Created by Joe on 2017/3/9.
 */


//原型链继承
/**
 * 原型链是 JavaScript 中实现继承的默认方式，
 * 如果要让子对象继承父对象的话，将子对象构造函数的prototype属性指向父对象的一个实例：
 * */
function Parent() {}
function Child() {}
Child.prototype = new Parent()