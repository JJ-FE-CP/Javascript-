/**
 * Created by Joe on 2017/3/9.
 */

function Parent() {
}
function Child() {
}

/**
 * 1、原型链继承：
 * 原型链是 JavaScript 中实现继承的默认方式，如果要让子对象继承父对象的话，将子对象构造函数的prototype属性指向父对象的一个实例。
 * 这个时候，Child的prototype属性被重写了，指向了一个新对象，但是这个新对象的constructor属性却没有正确指向Child，JS 引擎并不会自动为我们完成这件工作，这需要我们手动去将Child的原型对象的constructor属性重新指向Child
 * */

Child.prototype = new Parent()
Child.prototype.constructor = Child


/**
 * 2、原型继承（非原型链）
 * 为了避免上一个方法需要重复创建原型对象实例的问题，可以直接将子对象构造函数的prototype指向父对象构造函数的prototype，这样，所有Parent.prototype中的属性和方法也能被重用，同时不需要重复创建原型对象实例。
 * 但是我们知道，在 JavaScript 中，对象是作为引用类型存在的，这种方法实际上是将Child.prototype和Parent.prototype中保存的指针指向了同一个对象，因此，当我们想要在子对象原型中扩展一些属性以便之后继续继承的话，父对象的原型也会被改写，因为这里的原型对象实例始终只有一个，这也是这种继承方式的缺点。
 *  */


Child.prototype = Parent.prototype
Child.prototype.constructor = Child

/**
 * 临时构造器继承
 * 为了解决上面的问题，可以借用一个临时构造器起到一个中间层的作用，所有子对象原型的操作都是在临时构造器的实例上完成，不会影响到父对象原型。
 * 同时，为了可以在子对象中访问父类原型中的属性，可以在子对象构造器上加入一个指向父对象原型的属性，如uber，这样，可以在子对象上直接通过child.constructor.uber访问到父级原型对象。
 * */

var F = function () {
}
F.prototype = Parent.prototype
Child.prototype = new F()
Child.prototype.constructor = Child

/**
 * 我们可以将上面的这些工作封装成一个函数，以后调用这个函数就可以方便实现这种继承方式了*/

function extend(Child, Parent) {
    var F = function () {
    }
    F.prototype = Parent.prototype
    Child.prototype = new F()
    Child.prototype.constructor = Child
    Child.uber = Parent.prototype
}




