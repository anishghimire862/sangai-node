-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Dec 19, 2020 at 05:43 PM
-- Server version: 10.3.27-MariaDB
-- PHP Version: 7.3.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sangai`
--

-- --------------------------------------------------------

--
-- Table structure for table `chatrooms`
--

CREATE TABLE `chatrooms` (
  `id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` varchar(150) DEFAULT NULL,
  `owner_id` int(11) DEFAULT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `chatrooms`
--

INSERT INTO `chatrooms` (`id`, `name`, `description`, `owner_id`, `created_on`) VALUES
(1, 'Nepal', 'Welcome to Nepal, officially the Federal Democratic Republic of Nepal. ', 94, '2020-09-23 09:45:18'),
(2, 'sangai', 'Welcome to sangai. The global community for sangai users.', 94, '2020-09-23 09:46:00'),
(3, 'helloWorld', 'Welcome to Hello World this is the global community for developers.', 94, '2020-09-23 09:46:39'),
(4, 'Kathmandu', 'Kathmandu is a beautiful city ;) welcome everyone...', 94, '2020-09-23 09:47:19'),
(5, 'Friends', 'If we can be friends welcome to this space.', 94, '2020-09-23 09:47:58');

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `content` varchar(150) DEFAULT NULL,
  `feed_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `creator`, `content`, `feed_id`, `created_at`) VALUES
(9, 'anish', 'hello ', 73, '2020-12-14 09:38:00'),
(10, 'anish', 'bye', 73, '2020-12-14 09:38:27'),
(11, 'anish', 'hello', 73, '2020-12-14 09:38:46'),
(12, 'anish', 'hello', 73, '2020-12-14 09:38:49');

-- --------------------------------------------------------

--
-- Table structure for table `feed`
--

CREATE TABLE `feed` (
  `id` int(11) NOT NULL,
  `creator` varchar(50) DEFAULT NULL,
  `content` varchar(150) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `feed`
--

INSERT INTO `feed` (`id`, `creator`, `content`, `created_at`) VALUES
(12, 'anish', 'do you know this is the very first post', '2020-10-16 11:54:23'),
(13, 'anish', 'hello', '2020-10-16 12:13:55'),
(14, 'krrishg', 'ok bye', '2020-10-16 12:31:16'),
(15, 'krrishg', 'hello hello hello hello hello hello hello hello hello hello hello hello ', '2020-10-16 14:29:56'),
(16, 'anish', 'lol', '2020-10-16 14:31:09'),
(17, 'anish', 'yes', '2020-10-16 14:32:52'),
(18, 'anish', 'a', '2020-10-16 14:33:06'),
(19, 'anish', 'abcd', '2020-10-16 14:33:33'),
(20, 'anish', 'wassup', '2020-10-16 14:34:42'),
(21, 'anish', 'hey guys', '2020-10-16 14:35:50'),
(22, 'anish', 'wassup', '2020-10-16 14:36:04'),
(23, 'anish', 'alert', '2020-10-16 14:36:10'),
(24, 'anish', 'aaaaa', '2020-10-16 14:36:31'),
(25, 'anish', 'hello world', '2020-10-16 14:38:03'),
(26, 'anish', 'k chha', '2020-10-16 14:38:08'),
(27, 'anish', 'hyayyayayay', '2020-10-16 14:38:12'),
(28, 'anish', 'why', '2020-10-16 14:45:03'),
(29, 'anish', 'hello', '2020-10-16 14:48:21'),
(30, 'anish', 'lol', '2020-10-16 14:48:31'),
(31, 'anish', 'wassup', '2020-10-16 14:48:34'),
(32, 'anish', 'kakkakak', '2020-10-16 14:48:49'),
(33, 'anisha', 'hello hello hello', '2020-10-16 14:50:43'),
(34, 'anisha', 'last', '2020-10-16 16:06:36'),
(35, 'anisha', 'woow', '2020-10-16 16:06:44'),
(36, 'anish', '', '2020-10-16 18:52:31'),
(37, 'anish', '', '2020-10-16 18:52:33'),
(38, 'anish', '', '2020-10-16 18:52:35'),
(39, 'anish', '', '2020-10-16 18:52:36'),
(40, 'anish', '', '2020-10-16 18:52:37'),
(41, 'anish', '', '2020-10-16 18:52:37'),
(42, 'anish', '', '2020-10-16 18:52:38'),
(43, 'anish', '', '2020-10-16 18:52:39'),
(44, 'anish', '', '2020-10-16 18:52:40'),
(45, 'anish', '', '2020-10-16 18:52:49'),
(46, 'anish', '', '2020-10-16 18:52:50'),
(47, 'anish', '', '2020-10-16 18:52:51'),
(48, 'anish', 'helo', '2020-10-17 14:16:16'),
(49, 'anish', 'help', '2020-10-17 14:16:19'),
(50, 'anish', 'aaa', '2020-10-17 14:16:22'),
(51, 'anish', 'hello this is my post in sangai i hope this is good', '2020-10-17 14:18:39'),
(52, 'anish', 'helo', '2020-10-17 14:19:47'),
(53, 'anish', 'hihihi', '2020-10-17 14:19:50'),
(54, 'anish', 'hehehe', '2020-10-17 14:19:52'),
(55, 'anish', 'wooow', '2020-10-20 07:28:45'),
(56, 'anish', 'hey', '2020-10-20 07:40:15'),
(57, 'anish', 'aa', '2020-10-20 09:09:32'),
(58, 'anish', 'lol', '2020-10-20 09:09:37'),
(59, 'anish', 'bye', '2020-10-20 09:10:29'),
(60, 'anish', 'what will i do', '2020-10-20 13:35:16'),
(61, 'anish', 'test', '2020-10-20 13:57:26'),
(62, 'anish', 'lol', '2020-10-20 13:58:03'),
(63, 'anish', 'hey hey hey', '2020-10-20 13:58:35'),
(64, 'anish', 'hello', '2020-11-21 10:48:31'),
(65, 'anish', 'hello', '2020-11-21 10:48:34'),
(66, 'anish', 'hey', '2020-11-30 11:37:35'),
(67, 'anish', 'ok bye', '2020-11-30 11:37:38'),
(68, 'anish', '', '2020-12-05 11:08:05'),
(69, 'anish', 'helllo world this is my post', '2020-12-05 11:17:18'),
(70, 'dips', 'ggggggtttttt', '2020-12-06 05:04:37'),
(71, 'dips', 'shhshs', '2020-12-06 05:45:49'),
(72, 'anish', 'new post', '2020-12-08 17:13:12'),
(73, 'anish', 'hello krrishg', '2020-12-12 11:39:04'),
(74, 'anish', '', '2020-12-14 14:30:37');

-- --------------------------------------------------------

--
-- Table structure for table `likes`
--

CREATE TABLE `likes` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `post_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `likes`
--

INSERT INTO `likes` (`id`, `username`, `post_id`) VALUES
(77, 'anish', 73);

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `id` int(11) NOT NULL,
  `sender` varchar(50) DEFAULT NULL,
  `receiver` varchar(50) DEFAULT NULL,
  `type` varchar(50) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `is_read` int(11) DEFAULT 0,
  `content` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`id`, `sender`, `receiver`, `type`, `created_at`, `is_read`, `content`) VALUES
(1, 'anish', 'anish', 'ecard', '2020-10-08 09:00:09', 0, 'image-1602147609506.png'),
(2, 'anish', 'anisha', 'ecard', '2020-10-08 09:01:30', 0, 'image-1602147690751.png'),
(3, 'anish', 'anisha', 'ecard', '2020-10-08 09:04:48', 0, 'image-1602147888340.png'),
(4, 'anish', 'anisha', 'ecard', '2020-10-08 09:06:15', 0, 'image-1602147975329.png'),
(5, 'anish', 'krrishg', 'ecard', '2020-10-08 09:07:19', 0, 'image-1602148039010.png'),
(10, 'anish', 'saroz0', 'ecard', '2020-10-08 09:16:17', 0, 'image-1602148577469.png'),
(11, 'anish', 'anisha', 'ecard', '2020-10-08 09:31:20', 0, 'image-1602149480751.png'),
(12, 'anish', 'anisha', 'ecard', '2020-10-08 09:34:21', 0, 'image-1602149661682.png'),
(13, 'anish', 'anisha', 'ecard', '2020-10-08 09:40:25', 0, 'image-1602150025411.png'),
(21, 'anish', 'sangai', 'ecard', '2020-10-09 11:38:12', 0, 'image-1602243492672.png'),
(34, 'anish', 'anishg', 'ecard', '2020-10-09 14:13:17', 0, 'image-1602252797312.png'),
(40, 'anish', 'anishg', 'ecard', '2020-10-10 09:43:41', 0, 'image-1602323021590.png'),
(41, 'anish', 'anisha', 'ecard', '2020-10-10 09:45:15', 0, 'image-1602323115320.png'),
(42, 'anish', 'sangai', 'ecard', '2020-10-10 09:47:30', 0, 'image-1602323250499.png'),
(43, 'anish', 'krrishg', 'ecard', '2020-10-10 09:48:40', 0, 'image-1602323320234.png'),
(44, 'anish', 'anisha', 'ecard', '2020-10-10 09:51:46', 0, 'image-1602323506354.png'),
(45, 'anish', 'anisha', 'ecard', '2020-10-10 09:53:13', 0, 'image-1602323593274.png'),
(46, 'anish', 'anisha', 'ecard', '2020-10-10 09:55:06', 0, 'image-1602323706701.png'),
(47, 'anish', 'anisha', 'ecard', '2020-10-10 09:57:27', 0, 'image-1602323847393.png'),
(48, 'anish', 'anisha', 'ecard', '2020-10-10 09:58:59', 0, 'image-1602323939918.png'),
(49, 'anish', 'anisha', 'ecard', '2020-10-10 10:01:14', 0, 'image-1602324074019.png'),
(50, 'anish', 'anisha', 'ecard', '2020-10-10 10:03:25', 0, 'image-1602324205408.png'),
(51, 'anish', 'anisha', 'ecard', '2020-10-10 10:06:41', 0, 'image-1602324401415.png'),
(52, 'anish', 'anisha', 'ecard', '2020-10-10 10:08:05', 0, 'image-1602324485584.png'),
(53, 'anish', 'anisha', 'ecard', '2020-10-10 10:10:21', 0, 'image-1602324621974.png'),
(54, 'anish', 'anisha', 'ecard', '2020-10-10 10:12:49', 0, 'image-1602324769753.png'),
(55, 'anish', 'anisha', 'ecard', '2020-10-10 10:15:15', 0, 'image-1602324915550.png'),
(56, 'anish', 'anisha', 'ecard', '2020-10-10 10:15:57', 0, 'image-1602324957145.png'),
(57, 'anish', 'anisha', 'ecard', '2020-10-10 10:16:30', 0, 'image-1602324990462.png'),
(58, 'anish', 'anisha', 'ecard', '2020-10-10 10:17:20', 0, 'image-1602325040195.png'),
(59, 'anish', 'anisha', 'ecard', '2020-10-10 10:17:54', 0, 'image-1602325074109.png'),
(60, 'anish', 'anisha', 'ecard', '2020-10-10 10:18:19', 0, 'image-1602325099689.png'),
(61, 'anish', 'anisha', 'ecard', '2020-10-10 10:18:56', 0, 'image-1602325136239.png'),
(62, 'anish', 'anisha', 'ecard', '2020-10-10 10:20:10', 0, 'image-1602325210235.png'),
(63, 'anish', 'anisha', 'ecard', '2020-10-10 10:23:58', 0, 'image-1602325438430.png'),
(66, 'anish', 'anisha', 'ecard', '2020-10-10 10:27:24', 0, 'image-1602325644589.png'),
(67, 'anish', 'anisha', 'ecard', '2020-10-10 10:28:12', 0, 'image-1602325692851.png'),
(75, 'anish', 'anisha', 'ecard', '2020-10-10 11:17:00', 0, 'image-1602328620108.png'),
(76, 'anish', 'anisha', 'ecard', '2020-10-10 11:17:28', 0, 'image-1602328648817.png'),
(77, 'anish', 'anisha', 'ecard', '2020-10-10 11:18:43', 0, 'image-1602328723114.png'),
(78, 'anish', 'anisha', 'ecard', '2020-10-10 11:19:46', 0, 'image-1602328786780.png'),
(82, 'anish', 'krrishg', 'ecard', '2020-10-10 12:11:54', 0, 'image-1602331913393.png'),
(91, 'anish', 'krrishg', 'ecard', '2020-10-10 12:39:42', 0, 'image-1602333582924.png'),
(93, 'anish', 'anishg', 'ecard', '2020-10-10 13:43:34', 0, 'image-1602337414733.png'),
(94, 'anish', 'anisha', 'ecard', '2020-10-10 13:44:06', 0, 'image-1602337446616.png'),
(95, 'anish', 'anisha', 'ecard', '2020-10-10 13:44:42', 0, 'image-1602337482421.png'),
(96, 'anish', 'anisha', 'ecard', '2020-10-10 13:45:35', 0, 'image-1602337535940.png'),
(97, 'anish', 'anisha', 'ecard', '2020-10-10 13:45:38', 0, 'image-1602337538202.png'),
(98, 'anish', 'anisha', 'ecard', '2020-10-10 14:34:28', 0, 'image-1602340468302.png'),
(99, 'anisha', 'saroz0', 'ecard', '2020-10-10 15:59:46', 0, 'image-1602345586333.png'),
(100, 'anish', 'anisha', 'ecard', '2020-10-11 10:59:00', 0, 'image-1602413940609.png'),
(101, 'anish', 'anisha', 'ecard', '2020-10-11 11:15:09', 0, 'image-1602414909437.png'),
(102, 'anish', 'anisha', 'ecard', '2020-10-11 11:16:48', 0, 'image-1602415008555.png'),
(103, 'anish', 'anisha', 'ecard', '2020-10-11 11:24:03', 0, 'image-1602415443278.png'),
(104, 'anish', 'anisha', 'ecard', '2020-10-11 11:24:58', 0, 'image-1602415498029.png'),
(105, 'anish', 'anisha', 'ecard', '2020-10-11 11:25:13', 0, 'image-1602415513787.png'),
(106, 'anish', 'anisha', 'ecard', '2020-10-11 11:26:44', 0, 'image-1602415604526.png'),
(107, 'anish', 'anisha', 'ecard', '2020-10-11 11:27:50', 0, 'image-1602415670675.png'),
(108, 'anish', 'anisha', 'ecard', '2020-10-11 11:29:13', 0, 'image-1602415753335.png'),
(109, 'anish', 'anisha', 'ecard', '2020-10-11 11:34:23', 0, 'image-1602416063225.png'),
(110, 'anish', 'anisha', 'ecard', '2020-10-11 11:38:36', 0, 'image-1602416316748.png'),
(111, 'anisha', 'anish', 'ecard', '2020-10-11 11:38:43', 0, 'image-1602416323486.png'),
(112, 'anish', 'anisha', 'ecard', '2020-10-11 11:40:48', 0, 'image-1602416448142.png'),
(113, 'anish', 'anisha', 'ecard', '2020-10-11 11:41:40', 0, 'image-1602416500941.png'),
(114, 'anish', 'anisha', 'ecard', '2020-10-11 11:42:18', 0, 'image-1602416538628.png'),
(115, 'anish', 'anisha', 'ecard', '2020-10-11 11:43:39', 0, 'image-1602416619551.png'),
(116, 'anish', 'saroz0', 'ecard', '2020-10-11 11:48:43', 0, 'image-1602416923025.png'),
(117, 'anish', 'anisha', 'ecard', '2020-10-11 11:51:30', 0, 'image-1602417090348.png'),
(118, 'anish', 'anisha', 'ecard', '2020-10-11 13:10:19', 0, 'image-1602421819460.png'),
(119, 'anisha', 'anish', 'ecard', '2020-10-11 13:12:29', 0, 'image-1602421949167.png'),
(120, 'anisha', 'anish', 'ecard', '2020-10-11 13:38:45', 0, 'image-1602423524926.png'),
(121, 'anish', 'anisha', 'ecard', '2020-10-11 13:40:17', 0, 'image-1602423617967.png'),
(122, 'anisha', 'anish', 'ecard', '2020-10-11 13:40:53', 0, 'image-1602423653541.png'),
(123, 'anish', 'krrishg', 'ecard', '2020-10-11 13:50:46', 0, 'image-1602424244127.png'),
(124, 'anisha', 'anish', 'ecard', '2020-10-11 14:33:45', 0, 'image-1602426825381.png'),
(125, 'anish', 'anisha', 'ecard', '2020-10-11 14:34:29', 0, 'image-1602426869374.png'),
(126, 'anish', 'anish', 'ecard', '2020-10-11 14:35:29', 0, 'image-1602426929710.png'),
(127, 'anisha', 'anish', 'ecard', '2020-10-11 14:35:41', 0, 'image-1602426941430.png'),
(128, 'anish', 'anisha', 'ecard', '2020-10-13 13:07:44', 0, 'image-1602594464205.png'),
(129, 'anish', 'anisha', 'ecard', '2020-10-13 14:46:27', 0, 'image-1602600387938.png'),
(130, 'anish', 'krrishg', 'ecard', '2020-10-13 14:49:13', 0, 'image-1602600553621.png'),
(131, 'anish', 'krrishg', 'ecard', '2020-10-13 14:51:54', 0, 'image-1602600714150.png'),
(132, 'anish', 'krrishg', 'ecard', '2020-10-13 14:52:52', 0, 'image-1602600772836.png'),
(133, 'krrishg', 'anish', 'ecard', '2020-10-13 15:00:20', 0, 'image-1602601220313.png'),
(134, 'anish', 'anisha', 'ecard', '2020-10-13 15:00:58', 0, 'image-1602601258385.png'),
(135, 'anish', 'anisha', 'ecard', '2020-10-14 05:01:36', 0, 'image-1602651696355.png'),
(136, 'anish', 'anisha', 'ecard', '2020-10-14 05:04:48', 0, 'image-1602651888629.png'),
(137, 'anish', 'anisha', 'ecard', '2020-10-15 09:16:15', 0, 'image-1602753375140.png'),
(138, 'anish', 'anisha', 'ecard', '2020-10-16 14:49:58', 0, 'image-1602859798548.png'),
(139, 'anish', 'krrishg', 'ecard', '2020-11-21 10:49:01', 0, 'image-1605955741099.png'),
(140, 'anish', 'krrishg', 'ecard', '2020-12-05 11:08:28', 0, 'image-1607166508908.png'),
(141, 'dips', 'anish', 'ecard', '2020-12-06 05:05:01', 0, 'image-1607231101238.png'),
(142, 'anish', 'krrishg', 'ecard', '2020-12-11 07:48:40', 0, 'image-1607672919555.png');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(50) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(250) NOT NULL,
  `created_on` timestamp NOT NULL DEFAULT current_timestamp(),
  `avatar` varchar(50) NOT NULL DEFAULT 'default.jpg',
  `status` varchar(150) NOT NULL DEFAULT 'welcome to sangai'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `created_on`, `avatar`, `status`) VALUES
(85, 'anishghimire862@gmail.com', 'anish', 'anishg', '2020-09-13 17:14:41', 'male-avatar.webp', 'welcome to sangai'),
(86, 'anish@anish.com', 'anishg', 'anishg', '2020-09-14 08:37:30', 'male-avatar.webp', 'welcome to sangai'),
(87, 'anishghimire862@gmail.comsajlkshkj', 'amshdkjhjk', 'hkjhaskjhkjh', '2020-09-14 08:45:19', 'male-avatar.webp', 'welcome to sangai'),
(88, 'anish.ghimire8@kcmit.edu.np', 'anishg-', 'anishg', '2020-09-15 06:46:54', 'male-avatar.webp', 'welcome to sangai'),
(89, 'test@test.com', 'test', 'testing', '2020-09-17 12:03:57', 'male-avatar.webp', 'welcome to sangai'),
(90, 'krrishghimire@protonmail.com', 'krrishg', 'krrishg', '2020-09-17 15:52:25', 'male-avatar.webp', 'welcome to sangai'),
(91, 'tejp55@gmail.com', 'tejp', 'prakashg', '2020-09-17 15:52:50', 'male-avatar.webp', 'welcome to sangai'),
(92, 'kaflesaroz0@gmail.com', 'saroz0', 'anishg', '2020-09-18 14:32:05', 'male-avatar.webp', 'welcome to sangai'),
(93, 'anisha@anisha.com', 'anisha', 'anishg', '2020-09-19 20:15:48', 'female-avatar.webp', 'welcome to sangai'),
(94, 'contact@sangai.com', 'sangai', 'anishg', '2020-09-23 09:44:39', 'male-avatar.webp', 'welcome to sangai'),
(95, 'babita.gimire@saangai.com', 'babita', 'anishg', '2020-09-24 14:03:32', 'female-avatar.webp', 'welcome to sangai'),
(96, 'hello@world.com', 'testingok', 'testingok', '2020-10-08 08:56:44', 'male-avatar.webp', 'welcome to sangai'),
(97, 'dips.badu@gmail.com', 'dips', 'deepak', '2020-12-06 04:59:09', 'male-avatar.webp', 'welcome to sangai');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chatrooms`
--
ALTER TABLE `chatrooms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ownerId` (`owner_id`);

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator` (`creator`),
  ADD KEY `feed_id` (`feed_id`);

--
-- Indexes for table `feed`
--
ALTER TABLE `feed`
  ADD PRIMARY KEY (`id`),
  ADD KEY `creator` (`creator`);

--
-- Indexes for table `likes`
--
ALTER TABLE `likes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sender` (`sender`),
  ADD KEY `receiver` (`receiver`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chatrooms`
--
ALTER TABLE `chatrooms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `feed`
--
ALTER TABLE `feed`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT for table `likes`
--
ALTER TABLE `likes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=143;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=98;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chatrooms`
--
ALTER TABLE `chatrooms`
  ADD CONSTRAINT `chatrooms_ibfk_1` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`feed_id`) REFERENCES `feed` (`id`);

--
-- Constraints for table `feed`
--
ALTER TABLE `feed`
  ADD CONSTRAINT `feed_ibfk_1` FOREIGN KEY (`creator`) REFERENCES `users` (`username`);

--
-- Constraints for table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `feed` (`id`);

--
-- Constraints for table `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_ibfk_1` FOREIGN KEY (`sender`) REFERENCES `users` (`username`),
  ADD CONSTRAINT `notifications_ibfk_2` FOREIGN KEY (`receiver`) REFERENCES `users` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
