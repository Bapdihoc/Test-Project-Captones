import type { RootState } from '@/stores';
import type { RouteObject } from 'react-router';

import { type FC, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate, useRoutes } from 'react-router-dom';

import AdminLayout from '@/layout/admin-layout';
import MainLayout from '@/layout/main-layout';
import VerifyOtpResetPasswordPage from '@/pages/auth/forgot-password/verify-otp';
import PostDetailDraftPage from '@/pages/post-detail/post-detail-draft';
import { historyNavigation } from '@/utils/common';
import { PATHS } from '@/utils/paths';

import WrapperRouteComponent from './config';

const FollowerPage = lazy(() => import('@/pages/followers'));

const SignInPage = lazy(() => import('@/pages/auth/signin'));
const SignUpPage = lazy(() => import('@/pages/auth/signup'));
const ForgotPasswordPage = lazy(() => import('@/pages/auth/forgot-password'));
const CreateNewPasswordPage = lazy(() => import('@/pages/auth/create-new-password'));
const OTPVerificationPage = lazy(() => import('@/pages/auth/otp'));
const HomePage = lazy(() => import('@/pages/home'));
const PostPage = lazy(() => import('@/pages/post'));
const ProfilePage = lazy(() => import('@/pages/profile'));
const NotFoundPage = lazy(() => import('@/pages/404'));
const WalletPage = lazy(() => import('@/pages/wallet'));
const NotificationPage = lazy(() => import('@/pages/notification'));
const RewardPage = lazy(() => import('@/pages/reward'));
const FeedbackPage = lazy(() => import('@/pages/feedback'));
const UserProfilePage = lazy(() => import('@/pages/user-profile'));
const AdminFeedbackPage = lazy(() => import('@/pages/admin/feedback'));
const AdminReportPage = lazy(() => import('@/pages/admin/report'));
const SearchPage = lazy(() => import('@/pages/search'));
const AboutPage = lazy(() => import('@/pages/about'));
const ContentPolicyPage = lazy(() => import('@/pages/content-policy'));
const HelpPage = lazy(() => import('@/pages/help'));
const EventsPage = lazy(() => import('@/pages/events'));
const EventPage = lazy(() => import('@/pages/event'));
const BookmarksPage = lazy(() => import('@/pages/bookmarks'));
const PostDetailPage = lazy(() => import('@/pages/post-detail'));
const DepositPage = lazy(() => import('@/pages/deposit'));
const RecommendationsPage = lazy(() => import('@/pages/recommendations'));
const FollowPage = lazy(() => import('@/pages/followings'));
const BlockedListPage = lazy(() => import('@/pages/blocked-list'));
const ExplorePage = lazy(() => import('@/pages/explore'));
const AdminCategoryPage = lazy(() => import('@/pages/admin/category'));
const AdminTopicPage = lazy(() => import('@/pages/admin/topic'));
const AdminTagPage = lazy(() => import('@/pages/admin/tag'));
const AdminRewardPage = lazy(() => import('@/pages/admin/reward'));
const AdminUserPage = lazy(() => import('@/pages/admin/user'));
const AdminDashboardPage = lazy(() => import('@/pages/admin/dashboard'));

const RenderRouter: FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { logged } = useSelector((state: RootState) => state.account);

    historyNavigation.navigate = useNavigate();
    historyNavigation.location = useLocation();

    const { accountInfo } = useSelector((state: RootState) => state.account);

    const routes: RouteObject[] = [
        {
            path: PATHS.HOME,
            element: (
                <WrapperRouteComponent
                    element={accountInfo?.role?.name === 'ADMIN' ? <AdminLayout /> : <MainLayout />}
                    title=""
                />
            ),
            children: [
                {
                    path: PATHS.HOME,
                    element: <WrapperRouteComponent element={<HomePage />} title="Homepage" />,
                },
                {
                    path: PATHS.POSTS,
                    element: <WrapperRouteComponent element={<PostPage />} title="Posts Page" />,
                },
                {
                    path: PATHS.PROFILE,
                    element: <WrapperRouteComponent element={<ProfilePage />} title="Profile Page" />,
                },
                {
                    path: PATHS.WALLET,
                    element: <WrapperRouteComponent element={<WalletPage />} title="Wallet" />,
                },
                {
                    path: PATHS.NOTIFICATION,
                    element: <WrapperRouteComponent element={<NotificationPage />} title="Notification" />,
                },
                {
                    path: PATHS.REWARDS,
                    element: <WrapperRouteComponent element={<RewardPage />} title="Reward" />,
                },
                {
                    path: PATHS.FEEDBACKS,
                    element: <WrapperRouteComponent element={<FeedbackPage />} title="Feedback" />,
                },
                {
                    path: PATHS.ADMIN_FEEDBACKS,
                    element: <WrapperRouteComponent element={<AdminFeedbackPage />} title="Admin Feedback" />,
                },
                {
                    path: PATHS.USER_PROFILE,
                    element: <WrapperRouteComponent element={<UserProfilePage />} title="User Profile" />,
                },
                {
                    path: PATHS.ADMIN_REPORTS,
                    element: <WrapperRouteComponent element={<AdminReportPage />} title="Admin Reports" />,
                },
                {
                    path: PATHS.SEARCH,
                    element: <WrapperRouteComponent element={<SearchPage />} title="Search Page" />,
                },
                {
                    path: PATHS.ABOUT,
                    element: <WrapperRouteComponent element={<AboutPage />} title="About Page" />,
                },
                {
                    path: PATHS.CONTENT_POLICY,
                    element: <WrapperRouteComponent element={<ContentPolicyPage />} title="Content Policy" />,
                },
                {
                    path: PATHS.HELP,
                    element: <WrapperRouteComponent element={<HelpPage />} title="Help" />,
                },
                {
                    path: PATHS.EVENTS,
                    element: <WrapperRouteComponent element={<EventsPage />} title="Events" />,
                },
                {
                    path: PATHS.EVENT_DETAIL,
                    element: <WrapperRouteComponent element={<EventPage />} title="Event Detail" />,
                },
                {
                    path: PATHS.BOOKMARKS,
                    element: <WrapperRouteComponent element={<BookmarksPage />} title="Bookmarks" />,
                },
                {
                    path: PATHS.POST_DETAIL,
                    element: <WrapperRouteComponent element={<PostDetailPage />} title="Post Detail" />,
                },
                {
                    path: PATHS.POST_DETAIL_DRAFT,
                    element: <WrapperRouteComponent element={<PostDetailDraftPage />} title="Post Detail Draft" />,
                },
                {
                    path: PATHS.DEPOSIT,
                    element: <WrapperRouteComponent element={<DepositPage />} title="Deposit" />,
                },
                {
                    path: PATHS.RECOMMENDATIONS,
                    element: <WrapperRouteComponent element={<RecommendationsPage />} title="Recommendations" />,
                },
                {
                    path: PATHS.FOLLOWING,
                    element: <WrapperRouteComponent element={<FollowPage />} title="Followings" />,
                },
                {
                    path: PATHS.FOLLOWER,
                    element: <WrapperRouteComponent element={<FollowerPage />} title="Followers" />,
                },
                {
                    path: PATHS.BLOCKED_LIST,
                    element: <WrapperRouteComponent element={<BlockedListPage />} title="Blocked List" />,
                },
                {
                    path: PATHS.EXPLORE,
                    element: <WrapperRouteComponent element={<ExplorePage />} title="Explore" />,
                },
                {
                    path: PATHS.ADMIN_CATEGORY,
                    element: <WrapperRouteComponent element={<AdminCategoryPage />} title="Admin Category" />,
                },
                {
                    path: PATHS.ADMIN_TOPICS,
                    element: <WrapperRouteComponent element={<AdminTopicPage />} title="Admin Topics" />,
                },
                {
                    path: PATHS.ADMIN_TAGS,
                    element: <WrapperRouteComponent element={<AdminTagPage />} title="Admin Tags" />,
                },
                {
                    path: PATHS.ADMIN_REWARDS,
                    element: <WrapperRouteComponent element={<AdminRewardPage />} title="Admin Rewards" />,
                },
                {
                    path: PATHS.ADMIN_USERS,
                    element: <WrapperRouteComponent element={<AdminUserPage />} title="Admin Users" />,
                },
                {
                    path: PATHS.ADMIN_DASHBOARD,
                    element: <WrapperRouteComponent element={<AdminDashboardPage />} title="Admin Dashboard" />,
                },
            ],
        },
        {
            path: PATHS.SIGNIN,
            element: <WrapperRouteComponent element={<SignInPage />} title="Signin Page" />,
        },
        {
            path: PATHS.SIGNUP,
            element: <WrapperRouteComponent element={<SignUpPage />} title="Signup Page" />,
        },
        {
            path: PATHS.FORGOT_PASSWORD,
            element: <WrapperRouteComponent element={<ForgotPasswordPage />} title="Forgot password" />,
        },
        {
            path: PATHS.OTP_RESET_PASSWORD,
            element: <WrapperRouteComponent element={<VerifyOtpResetPasswordPage />} title="OTP Reset Password" />,
        },
        {
            path: PATHS.CREATE_NEW_PASSWORD,
            element: <WrapperRouteComponent element={<CreateNewPasswordPage />} title="Create new password" />,
        },
        {
            path: PATHS.OTP_VERIFICATION,
            element: <WrapperRouteComponent element={<OTPVerificationPage />} title="OTP Verification" />,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ];

    const element = useRoutes(routes);

    return element;
};

export default RenderRouter;
