# coding=utf-8
from scipy.interpolate import interp1d
import numpy as np
import cv2
# from win32api import GetSystemMetrics


def interMotion(start_x, start_y, end_x, end_y, time, fps=60):
    """
    用于对泡泡的运动状态进行内插

    :param start_x: t1时刻的x
    :param start_y: t1时刻的y
    :param end_x: t2时刻的x
    :param end_y: t2时刻的y
    :param time: 变化所对应的时间，单位：秒
    :param fps: 最后生成动画时的fps(每秒帧数)
    :return: 内插出的变化过程中各帧中物体的位置
    """
    t = [0, 1]
    x = [start_x, end_x]
    y = [start_y, end_y]

    f_x = interp1d(t, x)
    f_y = interp1d(t, y)

    ts = np.linspace(t[0], t[1], int(time) * fps)
    xs = f_x(ts)
    ys = f_y(ts)

    return xs, ys


def interColor(b_old, g_old, r_old, b_new, g_new, r_new, time, fps=60):
    """
    用于对泡泡的颜色进行内插

    :param b_old: t1时刻的blue通道灰度
    :param g_old: t1时刻的green通道灰度
    :param r_old: t1时刻的red通道灰度
    :param b_new: t2时刻的blue通道灰度
    :param g_new: t2时刻的green通道灰度
    :param r_new: t2时刻的red通道灰度
    :param time: 变化所对应的时间，单位：秒
    :param fps: 最后生成动画时的fps(每秒帧数)
    :return: 内插出的变化过程中各帧中物体的颜色
    """
    t = [0, 1]
    r = [r_old, r_new]
    g = [g_old, g_new]
    b = [b_old, b_new]

    f_r = interp1d(t, r)
    f_g = interp1d(t, g)
    f_b = interp1d(t, b)

    ts = np.linspace(t[0], t[1], int(time) * fps)
    rs = f_r(ts)
    gs = f_g(ts)
    bs = f_b(ts)
    return bs, gs, rs


def interRadius(r_old, r_new, time, fps=60):
    """
    用于内插泡泡半径

    :param r_old: t1时刻半径
    :param r_new: t2时刻半径
    :param time:变化对应时间，单位s
    :param fps:最后生成动画时的fps(每秒帧数)
    :return:内插出的变化过程中各帧中物体的半径
    """

    t = [0, 1]
    r = [r_old, r_new]
    f_r = interp1d(t, r)
    ts = np.linspace(t[0], t[1], int(time) * fps)
    rs = f_r(ts)
    return rs


def interBubble(img_width, img_height, max_radius, min_radius, every_time, fps,
                init_x, init_y, init_b, init_g, init_r, init_radius):
    """
    用于泡泡位置、大小、颜色的内插函数

    :param img_width:影像宽度
    :param img_height:影像高度
    :param max_radius:泡泡最大半径
    :param min_radius:泡泡最小半径
    :param every_time:两个状态间的时间
    :param fps:每秒帧数
    :param init_x:初始状态x坐标
    :param init_y:初始状态y坐标
    :param init_b:初始状态颜色blue波段
    :param init_g:初始状态颜色green波段
    :param init_r:初始状态颜色red波段
    :param init_radius:初始状态泡泡半径
    :return:各状态参数
    """
    end_x = np.random.randint(0, img_width + 1)
    end_y = np.random.randint(0, img_height + 1)
    xs, ys = interMotion(init_x, init_y, end_x, end_y, every_time, fps=fps)
    # print(
    # "motion:", "(" + init_x.__str__() + "," + init_y.__str__() + ")->(" +
    # end_x.__str__() + "," + end_y.__str__() + ")")

    end_b = np.random.randint(0, 256)
    end_g = np.random.randint(0, 256)
    end_r = np.random.randint(0, 256)
    bs, gs, rs = interColor(init_b,
                            init_g,
                            init_r,
                            end_b,
                            end_g,
                            end_r,
                            every_time,
                            fps=fps)
    # print ("color:", "(" + init_b.__str__() + "," + init_g.__str__() + "," + init_r.__str__() + ")->(" + \
    # end_b.__str__() + "," + end_g.__str__() + "," + end_r.__str__() + ")")

    end_radius = np.random.randint(min_radius, max_radius + 1)
    radius_new = interRadius(init_radius, end_radius, every_time, fps=fps)
    # print("radius:", init_radius, "->", end_radius)
    return xs, ys, bs, gs, rs, radius_new, end_x, end_y, end_b, end_g, end_r, end_radius


def initParams(img_width, img_height, max_radius, min_radius):
    """
    用于首次运行初始化参数

    :param img_width: 影像宽度
    :param img_height: 影像高度
    :param max_radius: 泡泡最大半径
    :param min_radius: 泡泡最小半径
    :return: 初始状态参数
    """
    init_x = np.random.randint(0, img_width + 1)
    init_y = np.random.randint(0, img_height + 1)
    # print "init (x,y):", init_x, init_y

    init_b = np.random.randint(0, 256)
    init_g = np.random.randint(0, 256)
    init_r = np.random.randint(0, 256)
    # print "init (b,g,r):", init_b, init_g, init_r

    init_radius = np.random.randint(min_radius, max_radius + 1)
    # print "init radius:", init_radius

    return init_x, init_y, init_b, init_g, init_r, init_radius


def clickAndExit(event, x, y, flags, param):
    """
    OpenCV图片显示窗口的回调函数，用于实现点击窗口退出功能

    :param event:
    :param x:
    :param y:
    :param flags:
    :param param:
    :return:
    """

    if event == cv2.EVENT_LBUTTONDOWN:
        cv2.destroyWindow("Img")
        exit()


if __name__ == '__main__':
    img_width = 500
    img_height = 400
    max_radius = 50
    min_radius = 30
    min_time = 3
    max_time = 5
    fps = 120
    flag_fullscreen = False

    if flag_fullscreen:
        # 调用API获取屏幕分辨率
        img_width = 1000  #GetSystemMetrics(0)
        img_height = 800  #GetSystemMetrics(1)
        # print "screen width =", GetSystemMetrics(0)
        # print "screen height =", GetSystemMetrics(1)

    init_x, init_y, init_b, init_g, init_r, init_radius = initParams(
        img_width, img_height, max_radius, min_radius)
    init_x2, init_y2, init_b2, init_g2, init_r2, init_radius2 = initParams(
        img_width, img_height, max_radius, min_radius)

    while True:

        # 每次随机指定一次变化的时间
        every_time = np.random.randint(min_time, max_time + 1)
        # print "\ntime:", every_time

        # 随机指定两个泡泡的重叠情况
        overlay_flag = np.random.randint(0, 2)
        # print "overlay flag:", overlay_flag

        xs, ys, bs, gs, rs, radius_new, end_x, end_y, end_b, end_g, end_r, end_radius = interBubble(
            img_width, img_height, max_radius, min_radius, every_time, fps,
            init_x, init_y, init_b, init_g, init_r, init_radius)
        # 将本阶段结束的状态赋给下一阶段作为初值
        init_x = end_x
        init_y = end_y
        init_b = end_b
        init_g = end_g
        init_r = end_r
        init_radius = end_radius

        xs2, ys2, bs2, gs2, rs2, radius_new2, end_x2, end_y2, end_b2, end_g2, end_r2, end_radius2 = interBubble(
            img_width, img_height, max_radius, min_radius, every_time, fps,
            init_x2, init_y2, init_b2, init_g2, init_r2, init_radius2)
        init_x2 = end_x2
        init_y2 = end_y2
        init_b2 = end_b2
        init_g2 = end_g2
        init_r2 = end_r2
        init_radius2 = end_radius2

        for i in range(xs.__len__()):
            img = np.zeros([img_height, img_width, 3], np.uint8)
            # 绘图
            if overlay_flag == 0:
                img2 = cv2.circle(img, (int(xs[i]), int(ys[i])),
                                  radius=int(radius_new[i]),
                                  color=(rs[i], gs[i], bs[i]),
                                  thickness=-1,
                                  lineType=cv2.LINE_AA)
                img3 = cv2.circle(img2, (int(xs2[i]), int(ys2[i])),
                                  radius=int(radius_new2[i]),
                                  color=(rs2[i], gs2[i], bs2[i]),
                                  thickness=-1,
                                  lineType=cv2.LINE_AA)
            else:
                img2 = cv2.circle(img, (int(xs2[i]), int(ys2[i])),
                                  radius=int(radius_new2[i]),
                                  color=(rs2[i], gs2[i], bs2[i]),
                                  thickness=-1,
                                  lineType=cv2.LINE_AA)
                img3 = cv2.circle(img2, (int(xs[i]), int(ys[i])),
                                  radius=int(radius_new[i]),
                                  color=(rs[i], gs[i], bs[i]),
                                  thickness=-1,
                                  lineType=cv2.LINE_AA)
            if flag_fullscreen:
                # 设置窗口回调函数
                cv2.namedWindow("Img", cv2.WND_PROP_FULLSCREEN)
                cv2.setMouseCallback("Img", clickAndExit)
                # 图片展示窗口全屏设置
                cv2.setWindowProperty("Img", cv2.WND_PROP_FULLSCREEN,
                                      cv2.WINDOW_FULLSCREEN)
                cv2.imshow("Img", img3)

            else:
                cv2.namedWindow("Img")
                cv2.setMouseCallback("Img", clickAndExit)
                cv2.imshow("Img", img3)
            cv2.waitKey(int(1000 / fps))
            k = cv2.waitKey(1) & 0xFF
            if k == 27:
                cv2.destroyWindow("Img")
                exit()
