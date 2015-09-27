import React from 'react/addons';
import classnames from 'classnames';


let CoffeeMachine = React.createClass({

  componentDidMount() {
    var s = new Snap('.coffee-machine-svg')
    var p = 100 / 30;
    var h = 250;
    var x = 400;
    var y = 200;
    var R = 100;
    var r = 70;
    var open = 0;
    var gstream;
    var gmilk = "l()#F4EEE6-#fff:50-#F4EEE6:50-#F4EEE6";
    var gcoffee = "l()#60544F-#8c7a73:50-#60544F:50-#60544F";
    var gwater = "l()#B4D6DB-#D6EDEE:50-#B4D6DB:50-#B4D6DB";
    Snap.load('/img/svg/coffee-machine.svg', (f) => {
      // var machine = response;
      // this.s.append(machine);

      var top = f.select("#top");
      var bot = f.select("#bottom");
      var tap = f.select("#tap");
      var knob = f.select("#knob");
      var dot = f.select("#dot");
      var arr = f.select("#arrow");
      var knobcx = knob.attr("cx");
      var knobcy = knob.attr("cy");
      var lead = f.select("#lead");
        var pie = {
            cx: f.select("#pie-chart circle").attr("cx"),
            cy: f.select("#pie-chart circle").attr("cy"),
            r: f.select("#pie-chart circle").attr("r"),
            coffee: f.select("#legend text"),
            water: f.selectAll("#legend text")[1],
            title: f.selectAll("#legend text")[2],
            waterBox: f.select("#legend rect:nth-child(2)")
        }
          var angle = 0
          var lastAngle
          var startAngle
          var leadOpenPath = lead.attr("d")
          var leadClosedPath = f.select("#lead-target").attr("d")
          var closed
          var grp = s.g().insertBefore(tap);
          f.select("#pie-chart").remove();
          f.select("#americano-area").click(function () {
              chosen(0);
          });
          f.select("#latte-area").click(function () {
              chosen(72);
          });
          f.select("#mocha-area").click(function () {
              chosen(144);
          });
          f.select("#mochiatto-area").click(function () {
              chosen(216);
          });
          f.select("#espresso-area").click(function () {
              chosen(288);
          });
          x = +top.attr("cx");
          y = +top.attr("cy");
          R = +top.attr("rx");
          r = +bot.attr("rx");
          h = bot.attr("cy") - y;
          s.add(f.select("g"));
          lead.click(function () {
              var path,
                  ease;
              if (closed) {
                  path = leadOpenPath;
                  ease = mina.easein;
                  closed = 0;
              } else {
                  path = leadClosedPath;
                  ease = mina.bounce;
                  closed = 1;
              }
              lead.stop().animate({
                  d: path
              }, 1000, ease);
          });
          knob.attr({
              fill: "#000",
              opacity: 0
          }).drag(function (dx, dy, x, y) {
              var a = Snap.angle(knobcx, knobcy, x, y) - startAngle + angle;
              dot.transform("r" + [a, knobcx, knobcy]);
              arr.transform("r" + [a, knobcx, knobcy]);
              lastAngle = a;
          }, function (x, y) {
              startAngle = Snap.angle(knobcx, knobcy, x, y);
              lastAngle = angle;
              dot.stop();
              arr.stop();
          }, function () {
              angle = lastAngle;
              var a = Snap.snapTo(72, angle, 36);
              chosen(a);
          });
          function chosen(a) {
              a = (a + 1080) % 360;
              angle = a;
              var to = "r" + [a, knobcx, knobcy];
              dot.animate({
                  transform: to
              }, 1000, mina.elastic);
              arr.animate({
                  transform: to
              }, 1000, mina.elastic, function () {
                  closeCup(function () {
                      types[a]();
                      pour();
                      pieShow();
                  });
              });
          }

          grp.path(outline(0, h)).attr("class", "outline");
          var o3 = (h - 70) / 3,
              o2 = (h - 70) / 2,
              cover = grp.ellipse(getEll(h - 60)).attr("class", "water"),
              ct1 = grp.path(cut(10, 10 + o3, 0)).attr({
                  fill: gcoffee
              }),
              ct2 = grp.path(cut(10 + o3, h - 60, 0)).attr({
                  fill: gwater
              }),
              middle = 10 + o3,
              pieCoffee,
              pieTitle,
              pieType,
              g = grp.g(),
              dr = grp.path(doors(0)).attr("class", "doors"),
              types = {
                  // americano
                  0: function () {
                      cover.attr("class", "water");
                      ct2.attr("fill", gwater);
                      middle = 10 + o3;
                      pieCoffee = 1 / 3;
                      pieType = "water";
                      pieTitle = "Americano";
                      gstream = "l(0,1,0,0)#60544F-#60544F:33-#B4D6DB";
                  },
                  // latté
                  72: function () {
                      cover.attr("class", "milk");
                      ct2.attr("fill", gmilk);
                      middle = 10 + o3 * 2;
                      pieCoffee = 2 / 3;
                      pieType = "milk";
                      pieTitle = "Latté";
                      gstream = "l(0,1,0,0)#60544F-#60544F:66-#fff";
                  },
                  // mocha
                  144: function () {
                      cover.attr("class", "milk");
                      ct2.attr("fill", gmilk);
                      middle = 10 + o3;
                      pieCoffee = 1 / 3;
                      pieType = "milk";
                      pieTitle = "Mocha";
                      gstream = "l(0,1,0,0)#60544F-#60544F:33-#fff";
                  },
                  // machiatto
                  216: function () {
                      cover.attr("class", "milk");
                      ct2.attr("fill", gmilk);
                      middle = 10 + o2;
                      pieCoffee = 1 / 2;
                      pieType = "milk";
                      pieTitle = "Machiatto";
                      gstream = "l(0,1,0,0)#60544F-#60544F:50-#fff";
                  },
                  // espresso
                  288: function () {
                      cover.attr("class", "coffee");
                      ct2.attr("fill", gcoffee);
                      middle = 10;
                      pieCoffee = 1;
                      pieType = "milk";
                      pieTitle = "Espresso";
                      gstream = "#60544F";
                  }
              };
          function closeCup(callback) {
              Snap.animate(90, 0, function (val) {
                  ct1.attr("path", cut(10, middle, val));
                  ct2.attr("path", cut(middle, h - 60, val));
                  dr.attr("path", doors(val));
              }, 500, mina.easein, callback);
          }
          function pour() {
              steam(g, function () {
                  Snap.animate(0, 90, function (val) {
                      ct1.attr("path", cut(10, middle, val));
                      ct2.attr("path", cut(middle, h - 60, val));
                      dr.attr("path", doors(val));
                  }, 1500, mina.elastic);
              });
          }
          var pieShow = (function () {
              var disc = s.circle(pie.cx, pie.cy, pie.r).attr({
                  fill: "#fff",
                  stroke: "#60544F"
              }),
              coffee = s.path().attr({
                  stroke: "#60544F",
                  strokeWidth: pie.r,
                  fill: "none"
              }),
              olda = 0,
              a;
              return function () {
                  var cof = pieCoffee,
                      type = pieType;
                  a = 360 * cof / 2;
                  pie.waterBox.attr({
                      fill: type == "water" ? "#d6edee" : "#fff"
                  });
                  disc.attr({
                      fill: type == "water" ? "#d6edee" : "#fff"
                  });
                  pie.title.attr({
                      "#text": pieTitle
                  });
                  pie.coffee.attr({
                      "#text": "Espresso (" + Math.round(cof * 100) + "%)"
                  });
                  pie.water.attr({
                      "#text": (type == "water" ? "Hot Water" : "Milk") + " (" + (100 - Math.round(cof * 100)) + "%)"
                  });
                  Snap.animate(olda, a, function (val) {
                      coffee.attr({
                          d: "M" + [pie.cx, pie.cy] +
                             "U" + [pie.r / 2, 90 - val, 90 + val]
                      });
                  }, 500, function () {
                      if (cof == 1) {
                          disc.attr({
                              fill: "#60544F"
                          });
                      }
                  });
                  olda = a;
              };
          }());

          types[0]();
          pour();
          pieShow();
    })
    function getEll(height) {
        var ra = r + (R - r) / h * height;
        return {
            cx: x,
            cy: y + h - height,
            rx: ra,
            ry: ra / p
        };
    }
    function arc(cx, cy, R, r, from, to, command) {
        var start = pointAtAngle(cx, cy, R, r, from),
            end = pointAtAngle(cx, cy, R, r, to);
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
    }
    function pointAtAngle(cx, cy, rx, ry, angle) {
        angle = Snap.rad(angle);
        return {
            x: cx + rx * Math.cos(angle),
            y: cy - ry * Math.sin(angle)
        };
    }
    function doors(alpha) {
        var sa = 270 - alpha / 2,
            ea = 270 + alpha / 2;
        if (alpha) {
            return arc(x, y, R, R / p, 180, sa) + arc(x, y + h, r, r / p, sa, 180, "L") + "z" +
                   arc(x, y, R, R / p, ea, 360) + arc(x, y + h, r, r / p, 360, ea, "L") + "z";
        } else {
            return arc(x, y, R, R / p, 180, 360) + arc(x, y + h, r, r / p, 360, 180, "L") + "z";
        }
    }
    function fill(from, to) {
        var start = getEll(from),
            end = getEll(to);
        return "M" + (start.cx - start.rx) + "," + start.cy + "h" + start.rx * 2 +
               arc(end.cx, end.cy, end.rx, end.ry, 0, 180, "L") + "z";
    }
    function outline(from, to) {
        var start = getEll(from),
            end = getEll(to);
        return arc(start.cx, start.cy, start.rx, start.ry, 180, 0) +
               arc(end.cx, end.cy, end.rx, end.ry, 0, 180, "L") + "z";
    }
    function cut(from, to, alpha) {
        var s = getEll(from),
            e = getEll(to),
            sa = Snap.rad(270 - alpha / 2),
            ea = Snap.rad(270 + alpha / 2);
        return "M" + [s.cx, s.cy,
            s.cx + s.rx * Math.cos(ea), s.cy - s.ry * Math.sin(ea),
            e.cx + e.rx * Math.cos(ea), e.cy - e.ry * Math.sin(ea),
            e.cx, e.cy,
            e.cx + e.rx * Math.cos(sa), e.cy - e.ry * Math.sin(sa),
            s.cx + s.rx * Math.cos(sa), s.cy - s.ry * Math.sin(sa)
        ] + "z";
    }
    function steam(g, callback) {
        g.rect(x - 10, y - 1030, 20, 1000, 10).attr({
            fill: gstream,
            clip: s.rect(x - 10, y - 200, 20, h + 200)
        }).animate({y: y + 40}, 800, function () {
            this.remove();
        });
        s.ellipse(x, y, R, R/p).attr({
            fill: "#fff",
            filter: s.filter(Snap.filter.blur(10))
        }).animate({cy: y - 30, opacity: 0}, 1000, callback);
    }
  },

  render() {
    return (
      <div className="coffee-machine col-xs-12">
        <svg className="coffee-machine-svg"></svg>
      </div>
    )
  }
})

export default CoffeeMachine;
