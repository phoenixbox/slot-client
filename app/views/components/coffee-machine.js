import React from 'react/addons';
import classnames from 'classnames';
import CoffeeslotsConfig from '../../utils/coffee-slots-config';
import _ from 'lodash' ;

var p = 100 / 30;
var h = 250;
var x = 400;
var y = 200;
var R = 100;
var r = 70;
var open = 0;
var angle = 0;
var gstream;
var gmilk = "l()#F4EEE6-#fff:50-#F4EEE6:50-#F4EEE6";
var gcoffee = "l()#60544F-#8c7a73:50-#60544F:50-#60544F";
var gwater = "l()#B4D6DB-#D6EDEE:50-#B4D6DB:50-#B4D6DB";

let CoffeeMachine = React.createClass({

  propTypes: {
    winner: React.PropTypes.bool,
    targetIndexes: React.PropTypes.object
  },

  chosen(a) {
    a = (a + 1080) % 360;
    angle = a;
    var to = "r" + [a, this.knobcx, this.knobcy];
    this.dot.animate({
        transform: to
    }, 1000, mina.elastic);
    this.arr.animate({
        transform: to
    }, 1000, mina.elastic, () => {
        this.closeCup( () => {
            this.types()[a]();
            this.pour();
            this.pieShow();
        });
    });
  },

  doors(alpha) {
    var sa = 270 - alpha / 2;
    var ea = 270 + alpha / 2;

    if (alpha) {
        return this.arc(x, y, R, R / p, 180, sa) + this.arc(x, y + h, r, r / p, sa, 180, "L") + "z" +
               this.arc(x, y, R, R / p, ea, 360) + this.arc(x, y + h, r, r / p, 360, ea, "L") + "z";
    } else {
        return this.arc(x, y, R, R / p, 180, 360) + this.arc(x, y + h, r, r / p, 360, 180, "L") + "z";
    }
  },

  getEll(height) {
      var ra = r + (R - r) / h * height;
      return {
          cx: x,
          cy: y + h - height,
          rx: ra,
          ry: ra / p
      };
  },

  arc(cx, cy, R, r, from, to, command) {
    var start = this.pointAtAngle(cx, cy, R, r, from);
    var end = this.pointAtAngle(cx, cy, R, r, to);
    command = command || "M";
    return command + Snap.format("{sx},{sy}A{R},{r},0,{big},{way},{tx},{ty}", {
        sx: start.x,
        sy: start.y,
        R: R,
        r: r,
        tx: end.x,
        ty: end.y,
        big: +(Math.abs(to - from) > 180),
        way: +(from > to)
    });
  },

  pointAtAngle(cx, cy, rx, ry, angle) {
    angle = Snap.rad(angle);
    return {
        x: cx + rx * Math.cos(angle),
        y: cy - ry * Math.sin(angle)
    };
  },

  fill(from, to) {
    var start = getEll(from);
    var end = getEll(to);
    return "M" + (start.cx - start.rx) + "," + start.cy + "h" + start.rx * 2 +
           this.arc(end.cx, end.cy, end.rx, end.ry, 0, 180, "L") + "z";
  },

  outline(from, to) {
    var start = this.getEll(from);
    var end = this.getEll(to);
    return this.arc(start.cx, start.cy, start.rx, start.ry, 180, 0) +
           this.arc(end.cx, end.cy, end.rx, end.ry, 0, 180, "L") + "z";
  },

  cut(from, to, alpha) {
    var s = this.getEll(from);
    var e = this.getEll(to);
    var sa = Snap.rad(270 - alpha / 2);
    var ea = Snap.rad(270 + alpha / 2);
    return "M" + [s.cx, s.cy,
      s.cx + s.rx * Math.cos(ea), s.cy - s.ry * Math.sin(ea),
      e.cx + e.rx * Math.cos(ea), e.cy - e.ry * Math.sin(ea),
      e.cx, e.cy,
      e.cx + e.rx * Math.cos(sa), e.cy - e.ry * Math.sin(sa),
      s.cx + s.rx * Math.cos(sa), s.cy - s.ry * Math.sin(sa)
    ] + "z";
  },

  steam(g, callback) {
    this.g.rect(x - 10, y - 1030, 20, 1000, 10).attr({
      fill: gstream,
      clip: this.s.rect(x - 10, y - 200, 20, h + 200)
    }).animate({y: y + 40}, 800, function () {
      this.remove();
    });
    this.s.ellipse(x, y, R, R/p).attr({
      fill: "#fff",
      filter: this.s.filter(Snap.filter.blur(10))
    }).animate({cy: y - 30, opacity: 0}, 1000, callback);
  },

  closeCup(callback) {
    Snap.animate(90, 0, (val) => {
      this.ct1.attr("path", this.cut(10, this.middle, val));
      this.ct2.attr("path", this.cut(this.middle, h - 60, val));
      this.dr.attr("path", this.doors(val));
    }, 500, mina.easein, callback);
  },

  lidClickHandler() {
    var path;
    var ease;
    if (this.closed) {
        path = this.leadOpenPath;
        ease = mina.easein;
        this.closed = 0;
    } else {
        path = this.leadClosedPath;
        ease = mina.bounce;
        this.closed = 1;
    }
    this.lead.stop().animate({
        d: path
    }, 1000, ease);
  },

  pour() {
    this.steam(this.g, () => {
      Snap.animate(0, 90, (val) => {
        this.ct1.attr("path", this.cut(10, this.middle, val));
        this.ct2.attr("path", this.cut(this.middle, h - 60, val));
        this.dr.attr("path", this.doors(val));
      }, 1500, mina.elastic);
    });
  },

  pieShow() {
    var disc = this.s.circle(this.pie.cx, this.pie.cy, this.pie.r).attr({
      fill: "#fff",
      stroke: "#60544F"
    })
    var coffee = this.s.path().attr({
      stroke: "#60544F",
      strokeWidth: this.pie.r,
      fill: "none"
    });
    var olda = 0
    var a;

    return (() => {
      var cof = this.pieCoffee;
      var type = this.pieType;
      a = 360 * cof / 2;
      this.pie.waterBox.attr({
        fill: type == "water" ? "#d6edee" : "#fff"
      });
      disc.attr({
        fill: type == "water" ? "#d6edee" : "#fff"
      });
      this.pie.title.attr({
        "#text": this.pieTitle
      });
      this.pie.coffee.attr({
        "#text": "Espresso (" + Math.round(cof * 100) + "%)"
      });
      this.pie.water.attr({
        "#text": (type == "water" ? "Hot Water" : "Milk") + " (" + (100 - Math.round(cof * 100)) + "%)"
      });
      Snap.animate(olda, a, (val) => {
        coffee.attr({
          d: "M" + [this.pie.cx, this.pie.cy] + "U" + [this.pie.r / 2, 90 - val, 90 + val]
        });
      }, 500, () => {
        if (cof == 1) {
          disc.attr({
            fill: "#60544F"
          });
        }
      });
      olda = a;
    })();
  },

  types() {
    return {
        // americano
        0: () => {
            this.cover.attr("class", "water");
            this.ct2.attr("fill", gwater);
            this.middle = 10 + this.o3;
            this.pieCoffee = 1 / 3;
            this.pieType = "water";
            this.pieTitle = "Americano";
            gstream = "l(0,1,0,0)#60544F-#60544F:33-#B4D6DB";
        },
        // latté
        72: () => {
            this.cover.attr("class", "milk");
            this.ct2.attr("fill", gmilk);
            this.middle = 10 + this.o3 * 2;
            this.pieCoffee = 2 / 3;
            this.pieType = "milk";
            this.pieTitle = "Latté";
            gstream = "l(0,1,0,0)#60544F-#60544F:66-#fff";
        },
        // mocha
        144: () => {
            this.cover.attr("class", "milk");
            this.ct2.attr("fill", gmilk);
            this.middle = 10 + this.o3;
            this.pieCoffee = 1 / 3;
            this.pieType = "milk";
            this.pieTitle = "Mocha";
            gstream = "l(0,1,0,0)#60544F-#60544F:33-#fff";
        },
        // machiatto
        216: () => {
            this.cover.attr("class", "milk");
            this.ct2.attr("fill", gmilk);
            this.middle = 10 + this.o2;
            this.pieCoffee = 1 / 2;
            this.pieType = "milk";
            this.pieTitle = "Machiatto";
            gstream = "l(0,1,0,0)#60544F-#60544F:50-#fff";
        },
        // espresso
        288: () => {
            this.cover.attr("class", "coffee");
            this.ct2.attr("fill", gcoffee);
            this.middle = 10;
            this.pieCoffee = 1;
            this.pieType = "milk";
            this.pieTitle = "Espresso";
            gstream = "#60544F";
        }
    }
  },

  componentDidMount() {
    this.s = new Snap('.coffee-machine-svg');
    this.lastAngle;
    this.startAngle;
    this.closed;

    Snap.load('/img/svg/coffee-machine.svg', (f) => {
      this.top = f.select("#top");
      this.bot = f.select("#bottom");
      this.tap = f.select("#tap");
      this.knob = f.select("#knob");
      this.dot = f.select("#dot");
      this.arr = f.select("#arrow");
      this.knobcx = this.knob.attr("cx");
      this.knobcy = this.knob.attr("cy");
      this.lead = f.select("#lead");
      this.pie = {
          cx: f.select("#pie-chart circle").attr("cx"),
          cy: f.select("#pie-chart circle").attr("cy"),
          r: f.select("#pie-chart circle").attr("r"),
          coffee: f.select("#legend text"),
          water: f.selectAll("#legend text")[1],
          title: f.selectAll("#legend text")[2],
          waterBox: f.select("#legend rect:nth-child(2)")
      }
      this.leadOpenPath = this.lead.attr("d");
      this.leadClosedPath = f.select("#lead-target").attr("d");
      this.grp = this.s.g().insertBefore(this.tap);

      f.select("#pie-chart").remove();
      x = + this.top.attr("cx");
      y = + this.top.attr("cy");
      R = + this.top.attr("rx");
      r = + this.bot.attr("rx");
      h = this.bot.attr("cy") - y;
      this.s.add(f.select("g"));
      this.lead.click(this.lidClickHandler);

      this.grp.path(this.outline(0, h)).attr("class", "outline");
      this.o3 = (h - 70) / 3;
      this.o2 = (h - 70) / 2;
      this.cover = this.grp.ellipse(this.getEll(h - 60)).attr("class", "water");
      this.ct1 = this.grp.path(this.cut(10, 10 + this.o3, 0)).attr({
          fill: gcoffee
      });
      this.ct2 = this.grp.path(this.cut(10 + this.o3, h - 60, 0)).attr({
          fill: gwater
      });
      this.middle = 10 + this.o3;
      this.pieCoffee;
      this.pieTitle;
      this.pieType;
      this.g = this.grp.g();
      this.dr = this.grp.path(this.doors(0)).attr("class", "doors");

      this.types()[0]();
      this.pour();
      this.pieShow();
    })
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.winner) {
      let allTypes = CoffeeslotsConfig.get('/SLIDE_TYPES');
      let typeIndex = _.values(nextProps.targetIndexes)[0];
      let drinkType = allTypes[typeIndex];
      let drinkAngles = CoffeeslotsConfig.get('/SLIDE_TYPE_ANGLES');

      this.chosen(drinkAngles[drinkType]);
    }
  },

  render() {
    return (
      <div className="coffee-machine col-xs-12">
        <svg viewBox="0 0 1050 800" className="coffee-machine-svg"></svg>
      </div>
    )
  }
})

export default CoffeeMachine;
